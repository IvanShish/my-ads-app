Ext.define('MyAdsApp.view.user.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login',

    onLoginClicked: function (owner) {
        var form = owner.up('#loginForm');

        if (form.getForm().isValid()) {
            var values = form.getForm().getValues();

            MyAdsApp.view.user.Firewall.login(values.email, values.password).then(function () {
                var payload = MyAdsApp.view.user.TokenStorage.parseJwt();
                MyAdsApp.view.user.UserStorage.save(payload);
                window.location.reload();
            }.bind(this), function (data) {
                Ext.Msg.alert('Error', data.message || 'An error occurred while logging in.');
            });
        }

    },

    onKeyPressed: function (textfield, event) {
        if (event.getKey() === event.ENTER) {
            this.onLoginClicked(textfield);
        }
    }
});