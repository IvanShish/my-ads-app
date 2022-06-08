Ext.define('MyAdsApp.view.user.chat.ChatWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.chatwindow',

    xtype: 'chatwindow',

    layout: 'fit',

    height: '50%',

    width: '20%',

    minimizable: true,

    resizable: false,

    draggable: false,

    config: {
        /**
         * @cfg {Boolean}
         * Is window minimized
         */
        isMinimized: false,
    },

    items: [{
        xtype: 'chat'
    }],

    listeners: {
        show: function () {
            Ext.GlobalEvents.fireEvent('new_contact', this.recordRef);
            this.alignTo(Ext.getBody(), 'br-br')
        },

        minimize: function (window, opts) {
            if (!this.isMinimized) {
                window.collapse();
                window.setWidth(150);
                window.alignTo(Ext.getBody(), 'br-br');
                this.isMinimized = true;
            }
            else {
                this.isMinimized = false;
                var window = this;
                window.setWidth('20%');
                window.expand('', false);
                window.alignTo(Ext.getBody(), 'br-br');
            }
        }
    }
});