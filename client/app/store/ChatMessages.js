Ext.define('MyAdsApp.store.ChatMessages', {
    extend: 'Ext.data.Store',

    alias: 'store.chatmessages',

    model: 'MyAdsApp.model.ChatMessage',

    proxy: {
        type: 'rest',
        url: serverUrl + '/api/messages',
        appendId: true, // default
        reader: {
            type: 'json'
        }
    }
});