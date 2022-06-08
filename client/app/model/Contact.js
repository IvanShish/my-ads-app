Ext.define('MyAdsApp.model.Contact', {
    extend: 'MyAdsApp.model.Base',

    idProperty: 'adId',

    fields: [{
        name: 'recipientId',
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
    }]
});