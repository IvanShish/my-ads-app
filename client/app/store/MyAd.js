var itemsPerPage = 20;

Ext.define('MyAdsApp.store.MyAd', {
    extend: 'Ext.data.Store',

    alias: 'store.my-ad',

    model: 'MyAdsApp.model.Ad',

    pageSize: itemsPerPage,

    autoLoad: true,

    remoteFilter: true,

    proxy: {
        type: 'rest',
        url: serverUrl + '/api/ads',
        reader: {
            type: 'json',
            rootProperty: 'items',
            totalProperty: 'results'
        },
        writer: {
            type: 'json'
        }
    },

    sorters: [{
        property: 'title',
        direction: 'DESC'
    }],

    filters: [{
        property: 'user',
        value: MyAdsApp.view.user.UserStorage.retrieveUserId(),
        operator: 'eq'
    }]
});
