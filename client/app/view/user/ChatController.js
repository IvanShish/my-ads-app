Ext.define('MyAdsApp.view.user.ChatController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chat',

    onMessageChange: function (textarea, newValue) {
    },

    /**
     * On text area enter hit send message throught this method
     * @param {Ext.form.field.TextArea} textarea Text area object
     * @param {Ext.event.Event} event Key event
     */
    onMessageSend: function (textarea, event) {
        var me = this.getView();

        if (event.getKey() === event.ENTER) {
            if (!event.shiftKey) {
                event.preventDefault();

                var content = textarea.getValue();
                if (content) {
                    var sender = MyAdsApp.view.user.UserStorage.retrieve();

                    var message = Ext.create('MyAdsApp.model.ChatMessage', {
                        senderId: sender.id,
                        recipientId: me.activeContact.getData().recipientId,
                        senderName: sender.firstName,
                        recipientName: me.activeContact.getData().recipientName,
                        adId: me.activeContact.getData().adId,
                        adTitle: me.activeContact.getData().adTitle,
                        content: content,
                        timestamp: new Date(),
                        status: "DELIVERED"
                    });

                    me.socket.stompClient.send("/app/chat", {}, JSON.stringify(message.getData()));
                    textarea.setValue('');
                    me.chatBox.getStore().load();
                    me.chatBox.getStore().sync();
                    me.goToRecord(me.chatBox.getStore().last());
                }
            }
        }
    }
});
