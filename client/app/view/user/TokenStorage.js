Ext.define('MyAdsApp.view.user.TokenStorage', {
    singleton: true,

    storageKey: 'json-web-token',

    clear: function () {
        sessionStorage.removeItem(this.storageKey);
    },

    retrieve: function () {
        return sessionStorage.getItem(this.storageKey);
    },

    save: function (token) {
        sessionStorage.setItem(this.storageKey, token);
    },

    parseJwt: function() {
        var token = sessionStorage.getItem(this.storageKey);
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return Ext.decode(JSON.parse(jsonPayload).sub);
        }

        return null;
    }
});