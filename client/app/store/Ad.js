var itemsPerPage = 20;

Ext.define('MyAdsApp.store.Ad', {
    extend: 'Ext.data.Store',

    alias: 'store.ad',

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
        property: 'state',
        value: 'ACTIVELY',
        operator: 'eq'
    },
    {
        property: 'user',
        value: sessionStorage.getItem('userId'),
        operator: 'neq'
    }]
});
