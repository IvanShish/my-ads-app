Ext.define('MyAdsApp.model.ChatMessage', {
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
        name: 'recipientId',
        type: 'string'
    },
    {
        name: 'senderName',
        type: 'string'
    },
    {
        name: 'recipientName',
        type: 'string'
    },
    {
        name: 'adId',
        type: 'string'
    },
    {
        name: 'adTitle',
        type: 'string'
    },
    {
        name: 'content',
        type: 'string'
    },
    {
        name: 'timestamp',
        type: 'date'
    },
    {
        name: 'status',
        type: 'string'
    }]
});