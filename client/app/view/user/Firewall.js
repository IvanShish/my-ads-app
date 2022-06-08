Ext.define('MyAdsApp.view.user.Firewall', {
    singleton: true,

    requires: [
        'MyAdsApp.view.user.TokenStorage'
    ],

    isLoggedIn: function () {
        return null !== MyAdsApp.view.user.TokenStorage.retrieve();
    },

    login: function (email, password) {
        var deferred = new Ext.Deferred();

        Ext.Ajax.request({
            url: serverUrl + '/api/auth/login',
            method: 'POST',
            jsonData: {
                'email': email,
                'password': password
            },

            success: function (response) {
                var data = response.responseText;
                if (data) {
                    MyAdsApp.view.user.TokenStorage.save(data);

                    deferred.resolve(data, response);
                } else {
                    deferred.reject(data, response);
                }
            },

            failure: function (response) {
                var data = Ext.decode(response.responseText);

                MyAdsApp.view.user.TokenStorage.clear();

                deferred.reject(data, response);
            }
        });

        return deferred.promise;
    },

    logout: function (callback) {
        MyAdsApp.view.user.TokenStorage.clear();

        if (callback) {
            callback();
        }
    },

    register: function(data) {
        var deferred = new Ext.Deferred();

        Ext.Ajax.request({
            url: serverUrl + '/api/auth/register',
            method: 'POST',
            jsonData: Ext.encode(data),

            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data) {
                    MyAdsApp.view.user.Firewall.login(data.email, data.password);

                    deferred.resolve(data, response);
                } else {
                    deferred.reject(data, response);
                }
            },

            failure: function (response) {
                var data = Ext.decode(response.responseText);

                deferred.reject(data, response);
            }
        });

        return deferred.promise;
    }

}, function () {
    Ext.Ajax.on('beforerequest', function (conn, options) {
        if (MyAdsApp.view.user.Firewall.isLoggedIn()) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = MyAdsApp.view.user.TokenStorage.retrieve();
        }
    });
});