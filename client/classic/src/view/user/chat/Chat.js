Ext.define('MyAdsApp.view.user.chat.Chat', {
    extend: 'Ext.form.Panel',

    layout: 'border',

    height: 800,

    config: {
        /**
         * @cfg {String}
         * User first name
         */
        firstName: '',
        /**
         * @cfg {String}
         * User id
         */
        userId: '',
        /**
         * @cfg {MyAdsApp.ux.ChatSocket}
         * Chat socket
         */
        socket: null,
        /**
         * @cfg {Boolean}
         * Is this panel created from window
         */
        isWindow: false
    },

    xtype: 'chat',

    viewModel: 'main',

    controller: 'chat',

    title: 'Chat',

    fullscreen: true,

    initComponent: function () {
        var me = this;
        me.callParent(arguments);

        var userId = MyAdsApp.view.user.UserStorage.retrieveUserId();
        if (userId) {
            if (!me.up('chatwindow')) {     // if this panel not in chat window (created for the first time)
                me.onSocketConnect();
                me.add(me.createContacts());
            }
            else {
                me.isWindow = true;
            }
        }

        Ext.on('connect', me.onSocketConnect, me);
        Ext.on('new_message', me.onSocketMessage, me);
        Ext.on('new_contact', me.onSocketContact, me);
    },

    onSocketConnect: function () {
        var me = this;

        if (!me.socket) {
            me.socket = Ext.create('MyAdsApp.ux.ChatSocket');
        }

        var user = MyAdsApp.view.user.UserStorage.retrieve();
        me.userId = user.id;
        me.firstName = user.firstName;
        me.socket.sendLogin(me.userId, me.isWindow);
    },

    /**
     * @param {MyAdsApp.ux.ChatSocket} chatsocket Chat socket class
     * @param {io} socket Socket.IO class
     * @param {Object} data Event data from Socket.IO
     */
    onSocketMessage: function (chatsocket, socket, data) {
        var me = this;
        if (me.contacts) {
            me.contacts.getStore().load();
            me.contacts.getStore().sync();
        }
        if (me.chatBox) {
            me.chatBox.getStore().load();
            me.chatBox.getStore().sync();
            me.goToRecord(me.chatBox.getStore().last());
        }
    },

    /**
     * @param {Object} ad Ad that interested the user
     */
    onSocketContact: function (ad) {
        var me = this;
        var userId = ad.getData().userId;
        var adId = ad.id;
        var adTitle = ad.getData().title;
        var firstName = me.getRecipientName(userId);

        contact = Ext.create('MyAdsApp.model.Contact', {
            recipientId: userId,
            recipientName: firstName,
            adId: adId,
            adTitle: adTitle
        });

        if (me.isWindow) {
            if (!me.chatBox && !me.messageBox && !me.contacts) {
                me.onSocketConnect(MyAdsApp.view.user.UserStorage.retrieveUserId());
            }
            else {
                me.removeAll();
                me.chatBox = null;
                me.messageBox = null;
                me.contacts = null;
            }
            me.add(me.createChatBox(contact));
            me.add(me.createMessageBox());
        }
        else {
            me.addChatRoom(contact);
        }
    },

    privates: {
        createContacts: function () {
            var me = this;
            if (!me.contacts) {
                me.contacts = Ext.create('Ext.grid.Panel', {
                    layout: 'fit',
                    flex: 1,
                    region: 'center',
                    padding: 5,
                    bodyBorder: true,
                    reserveScrollbar: true,
                    scrollable: 'x',
                    columnLines: false,
                    rowLines: false,
                    disableSelection: true,
                    hideable: true,
                    viewConfig: {
                        stripeRows: false,
                        trackOver: false,
                        preserveScrollOnRefresh: true,
                        scroll: true
                    },
                    hideHeaders: true,
                    columns: [{
                        flex: 1,
                        dataIndex: 'contact',
                        renderer: function (value, metaData, record) {
                            var adTitle = me.getAdTitle(record.getData().adId);
                            var recipientName = me.getRecipientName(record.getData().recipientId);

                            return '<div class="contacts"><div class="chat-contact-title">Ad: ' + adTitle + '</div><div class="chat-contact-name">' + recipientName + '</div></div><div class="chat-contact-clear"></div>';
                        }
                    }],
                    listeners: {
                        itemclick: function (dv, record) {
                            me.remove(me.contacts);
                            me.contacts = null;
                            me.add(me.createChatBox(record));
                            me.add(me.createMessageBox());

                            // Scroll to last message
                            var record = me.chatBox.getStore().last();
                            me.goToRecord(record);

                            // Set scroll to last message
                            me.chatBox.on('afterrender', function () {
                                var record = me.chatBox.getStore().last();
                                me.goToRecord(record);
                            });

                            // Because on focusing text area executes layout change and scroll falls back to grid top
                            me.messageBox.down('textarea').on('focus', function () {
                                var record = me.chatBox.getStore().last();
                                me.goToRecord(record);
                            });
                        }
                    }
                });
            }

            var contactsStore = me.getViewModel().getStore('chatrooms');
            contactsStore.getProxy().getApi().read = contactsStore.getProxy().getUrl() + '/' + me.userId;
            contactsStore.load();

            me.contacts.setStore(contactsStore);
            return me.contacts;
        },

        createChatBox: function (contact) {
            var me = this;

            var adTitle = me.getAdTitle(contact.getData().adId);
            var recipientName = me.getRecipientName(contact.getData().recipientId);

            if (!me.chatBox) {
                me.chatBox = Ext.create('Ext.grid.Panel', {
                    layout: 'fit',
                    flex: 1,
                    region: 'center',
                    header: {
                        cls: 'header-cls',
                        items: [{
                            xtype: 'button',
                            iconCls: 'fas fa-long-arrow-alt-left',
                            listeners: {
                                click: function () {
                                    me.remove(me.chatBox);
                                    me.chatBox = null;
                                    me.remove(me.messageBox);
                                    me.messageBox = null;
                                    me.add(me.createContacts());
                                }
                            }
                        }],
                        title: {
                            cls: 'header-title-cls',
                            text: !me.isWindow ? 'Chat with ' + recipientName + '. Ad title: ' + adTitle : 'Chat with ' + recipientName
                        },
                        titlePosition: 1
                    },
                    titleAlign: 'center',
                    padding: 5,
                    reserveScrollbar: true,
                    scrollable: 'x',
                    columnLines: false,
                    rowLines: false,
                    disableSelection: true,
                    viewConfig: {
                        stripeRows: false,
                        trackOver: false,
                        preserveScrollOnRefresh: true,
                        scroll: true
                    },
                    bind: {
                        store: '{chatmessages}'
                    },
                    hideHeaders: true,
                    columns: [{
                        flex: 1,
                        dataIndex: 'message',
                        renderer: function (value, metaData, record) {
                            var firstName = Ext.util.Format.stripTags(record.get('senderName'));
                            var message = Ext.util.Format.stripTags(record.get('content'));
                            return '<div class="chat-message chat-message-' + (me.firstName === firstName ? 'left' : 'right') + '"><div class="chat-user">' + firstName + '</div><div class="chat-text">' + message + '</div></div><div class="chat-message-clear"></div>';
                        }
                    }]
                });
            }

            var messagesStore = me.getViewModel().getStore('chatmessages');
            messagesStore.getProxy().getApi().read = messagesStore.getProxy().getUrl() + '/' + me.userId + '/' + contact.getData().adId;
            messagesStore.load();
            me.chatBox.setStore(messagesStore);

            me.activeContact = Ext.create('MyAdsApp.model.Contact', {
                recipientId: contact.getData().recipientId,
                recipientName: recipientName,
                adId: contact.getData().adId,
                adTitle: adTitle
            });

            return me.chatBox;
        },

        createMessageBox: function () {
            var me = this;
            if (!me.messageBox) {
                me.messageBox = Ext.create('Ext.panel.Panel', {
                    region: 'south',
                    layout: 'fit',
                    padding: 5,
                    items: [{
                        xtype: 'textarea',
                        growMax: 300,
                        growMin: 20,
                        minHeight: 20,
                        disabled: false,
                        maxRows: 1,
                        grow: true,
                        enableKeyEvents: true,
                        emptyText: 'Enter message...',
                        listeners: {
                            keydown: 'onMessageSend',
                            change: 'onMessageChange'
                        }
                    }]
                });
            }
            return me.messageBox;
        },

        getRecipientName: function (recipientId) {
            var name = "";

            Ext.Ajax.request({
                url: serverUrl + '/api/users/' + recipientId,
                async: false,

                success: function (response) {
                    name = Ext.JSON.decode(response.responseText).firstName;
                }
            });

            return name;
        },

        getAdTitle: function (adId) {
            var title = "";

            Ext.Ajax.request({
                url: serverUrl + '/api/ads/' + adId,
                async: false,

                success: function (response) {
                    title = Ext.JSON.decode(response.responseText).title;
                }
            });

            return title;
        },

        /**
         * Scroll to needed message
         * @param record Message record
         */
        goToRecord: function (record) {
            var me = this;
            if (record) {
                // Timeout to make sure all render events is processed
                Ext.defer(function () {
                    var rowEl = me.chatBox.getView().getRow(record);
                    var gridEl = me.chatBox.getEl();
                    if (rowEl) {
                        rowEl.scrollIntoView(gridEl, false);
                    }
                }, 10);
            }
        },

        /**
         * Append new chat room
         * @param {MyAdsApp.model.Contact} contact Contact record
         */
        addChatRoom: function (contact) {
            var me = this;
            var store = me.getViewModel().getStore('chatrooms');
            store.add(Ext.create('MyAdsApp.model.ChatRoom', {
                senderId: MyAdsApp.view.user.UserStorage.retrieveUserId(),
                adId: contact.id,
                recipientId: contact.getData().recipientId
            }));
            store.sync();
        }
    }
});