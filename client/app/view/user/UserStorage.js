Ext.define('MyAdsApp.view.user.UserStorage', {
    singleton: true,

    storageKey: 'user-id',

    clear: function () {
        sessionStorage.removeItem(this.storageKey);
    },

    retrieveUserId: function () {
        return sessionStorage.getItem(this.storageKey);
    },

    retrieve: function () {
        var me = this;
        var user = null;

        if (me.retrieveUserId()) {
            Ext.Ajax.request({
                url: serverUrl + '/api/users/' + me.retrieveUserId(),
                async: false,

                success: function (response) {
                    user = Ext.JSON.decode(response.responseText);
                }
            });
        }

        return user;
    },

    save: function (payload) {
        sessionStorage.setItem(this.storageKey, payload.userId);
    }
});