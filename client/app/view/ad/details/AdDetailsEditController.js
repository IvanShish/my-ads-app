Ext.define('MyAdsApp.view.ad.details.AdDetailsEditController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ad-details-edit',

    onSave: function () {
        var view = this.getView(),
            vm = view.getViewModel(),
            rec = vm.get('ad');

        Ext.Ajax.request({
            method: "PUT",
            url: serverUrl + '/api/ads/' + rec.getId(),
            headers: { 'Content-Type': 'application/json' },
            jsonData: Ext.JSON.encode(rec.getData()),

            success: function (response) {
                // setAdPicture
                var form = view.down('form');
                var isImageExists = form.submitImage({
                    url: serverUrl + '/api/ads/' + rec.getId() + '/picture',
                    success: function (response) {
                        window.location.reload();
                    },
                    failure: function (response) {
                        response = Ext.JSON.decode(response.responseText);
                        Ext.Msg.alert('Save failed', response.message);
                    }
                });
                if (!isImageExists) {
                    window.location.reload();
                }
            },

            failure: function (response) {
                response = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Save failed', response.message);
            }
        });
    },

    onWindowShow: function (win) {
        var view = this.getView(),
            vm = view.getViewModel(),
            rec = view.recordRef;

        vm.set('ad', rec);
    }
});