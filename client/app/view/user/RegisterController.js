Ext.define('MyAdsApp.view.user.RegisterController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.register',

    onRegisterClicked: function(owner) {
        var form = owner.up('#registerForm');

        if (form.getForm().isValid()) {
            var values = form.getForm().getValues();

            MyAdsApp.view.user.Firewall.register(values).then(function () {
                window.location.reload();
            }.bind(this), function (data) {
                Ext.Msg.alert('Error', data.message || 'An error occurred while registering.');
            });
        }
    },

    onResetClicked: function (owner) {
        owner.up('#registerForm').reset();
    }
});