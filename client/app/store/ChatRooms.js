Ext.define('MyAdsApp.store.ChatRooms', {
    extend: 'Ext.data.Store',

    alias: 'store.chatrooms',

    model: 'MyAdsApp.model.ChatRoom',

    proxy: {
        type: 'rest',
        url: serverUrl + '/api/rooms',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    }
});