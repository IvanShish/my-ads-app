/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('MyAdsApp.view.viewmodels.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'MyAdsApp.store.Ad',
        'MyAdsApp.model.ChatMessage',
        'MyAdsApp.store.MyAd',
        'MyAdsApp.store.ChatRooms'
    ],

    data: {
        name: 'MyAdsApp',
    },

    stores: {
        ads: {
            type: 'ad'
        },
        myads: {
            type: 'my-ad'
        },
        chatmessages: {
            type: 'chatmessages'
        },
        chatrooms: {
            type: 'chatrooms'
        }
    },

    formulas: {
        isUserLoggedIn: function (get) {
            return MyAdsApp.view.user.Firewall.isLoggedIn();
        }
    }

});
