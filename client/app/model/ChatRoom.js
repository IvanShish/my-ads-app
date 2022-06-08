Ext.define('MyAdsApp.model.ChatRoom', {
    extend: 'MyAdsApp.model.Base',

    identifier: 'uuid',

    fields: [{
        name: 'chatId',
        type: 'string'
    },
    {
        name: 'senderId',
        type: 'string'
    },
    {
        name: 'adId',
        type: 'string'
    },
    {
        name: 'recipientId',
        type: 'string'
    }]
});