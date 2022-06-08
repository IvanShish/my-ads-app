Ext.define('MyAdsApp.view.user.SettingsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user-settings',

    initViewModel: function() {
        this.callParent(arguments);
        var me = this;
        me.getViewModel().set('user', MyAdsApp.view.user.UserStorage.retrieve());
    },

    onSave: function () {
        var form = this.getView().getForm();
        if (form.isValid()) {
            form.submit({
                method: 'PUT',
                url: form.url + '/' + MyAdsApp.view.user.UserStorage.retrieveUserId(),

                success: function (form, action) {
                    window.location.reload();
                },

                failure: function (form, action) {
                    var response = Ext.JSON.decode(action.response.responseText);
                    console.log(action);
                    Ext.Msg.alert('Failed', response.message);
                }
            });
        }
    },

    onReset: function () {
        var form = this.getView().getForm();
        var values = form.getValues();
        this.getView().getForm().reset();
    }
});