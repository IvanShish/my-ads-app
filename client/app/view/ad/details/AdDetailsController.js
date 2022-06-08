Ext.define('MyAdsApp.view.ad.details.AdDetailsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ad-details',

    onSave: function () {
        var me = this;
        var form = me.getView().getForm();

        if (form.isValid()) {
            if (form.hasUpload()) {
                var record = form.getValues();

                Ext.Ajax.request({
                    method: 'POST',
                    url: serverUrl + '/api/ads',
                    jsonData: record,

                    success: function (response) {  // if the ad is created, then set the image and reload page
                        var file = me.getViewModel().get('imgData');
                        if (file) {
                            var data = new FormData();
                            data.append('file', file);
                            var response = Ext.JSON.decode(response.responseText);

                            Ext.Ajax.request({
                                method: 'POST',
                                url: serverUrl + '/api/ads/' + response.id + '/picture',
                                headers: { 'Content-Type': null },
                                rawData: data,

                                success: function (response) {
                                    console.log(response);
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            window.location.reload();
                        }

                    },

                    failure: function (form, action) {
                        var response = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Failed', response.message);
                    }
                });
            }
            // if there is no file, then form.submit
            else {
                form.baseParams = { 'userId': MyAdsApp.view.user.UserStorage.retrieveUserId() };
                form.submit({
                    success: function (form, action) {
                        window.location.reload();
                    },

                    failure: function (form, action) {
                        var response = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Failed', response.message);
                    }
                });
            }
        }
    },

    onReset: function () {
        this.getView().getForm().reset();
    }
});