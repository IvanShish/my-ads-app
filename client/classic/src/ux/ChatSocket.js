Ext.define('MyAdsApp.ux.ChatSocket', {
    extend: 'Ext.Component',

    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },

    onMessageReceived: function (msg) {
        var me = this;
        var decodedMessage = Ext.decode(msg.body);
        Ext.toast('New message recieved from ' + decodedMessage.senderName + '!');
        Ext.GlobalEvents.fireEvent('new_message', me, me.socket, decodedMessage);
    },

    sendLogin: function (data, isWindow) {
        var me = this;

        if (me.fireEvent('beforerequest', me, 'login', data) !== false) {

            me.socket = new SockJS('http://localhost:8080/ws');
            me.stompClient = Stomp.over(me.socket);

            me.stompClient.connect({}, function (frame) {
                if (!isWindow) {
                    me.stompClient.subscribe('/user/' + data + '/queue/messages', me.onMessageReceived);
                }
            });
        }
    },
});