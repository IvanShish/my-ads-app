Ext.define('MyAdsApp.view.ad.MyAdListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.my-ad-list',

    disableAllButtons: function () {
        var grid = this.getView();
        grid.down('#delete').setDisabled(true);
        grid.down('#edit').setDisabled(true);
        grid.down('#publish').setDisabled(true);
        grid.down('#unpublish').setDisabled(true);
    },

    onItemSelected: function (sender, record) {
        var grid = this.getView();
        var state = record.getData().state;
        grid.down('#edit').setDisabled(false);
        grid.down('#delete').setDisabled(false);

        if (state === 'WITHDRAWN' || state === 'DRAFT' || state === 'DELETED') {
            grid.down('#publish').setDisabled(false);
            grid.down('#unpublish').setDisabled(true);
        }
        else if (state === 'ACTIVELY') {
            grid.down('#publish').setDisabled(true);
            grid.down('#unpublish').setDisabled(false);
        }

        if (state === 'DELETED') {
            grid.down('#delete').setDisabled(true);
        }
    },

    onItemDeselected: function (sender, record) {
        this.disableAllButtons();
    },

    onEdit: function () {
        var grid = this.getView();
        var selection = grid.getSelectionModel().getSelection()[0];

        if (selection) {
            Ext.create('MyAdsApp.view.ad.AdDetailsEdit', {
                recordRef: selection,
            }).show();
        }
    },

    onDelete: function () {
        var grid = this.getView();
        var selection = grid.getSelectionModel().getSelection()[0];
        var store = this.getViewModel().getStore('myads').load();

        if (selection) {
            Ext.Ajax.request({
                url: serverUrl + '/api/ads/' + selection.id,
                method: 'DELETE',
            });
            store.sync();
        }

        Ext.Msg.alert('OK', 'Your ad has been removed');
        this.disableAllButtons();
    },

    onPublish: function () {
        var grid = this.getView();
        var selection = grid.getSelectionModel().getSelection()[0];
        var store = this.getViewModel().getStore('myads').load();
        var record = store.getById(selection.getData().id);
        var state = record.getData().state;

        if (state === 'WITHDRAWN' || state === 'DRAFT' || state === 'DELETED') {
            record.set('state', 'ACTIVELY')
        }

        grid.getSelectionModel().deselectAll();
        store.sync();
        this.disableAllButtons();
        Ext.Msg.alert('OK', 'Your ad has been published');
    },

    onUnpublish: function () {
        var grid = this.getView();
        var selection = grid.getSelectionModel().getSelection()[0];
        var store = this.getViewModel().getStore('myads').load();
        var record = store.getById(selection.getData().id);
        var state = record.getData().state;
        
        if (state === 'ACTIVELY') {
            record.set('state', 'WITHDRAWN')
        }

        grid.getSelectionModel().deselectAll();
        store.sync();
        this.disableAllButtons();
        Ext.Msg.alert('OK', 'Your ad has been unpublished');
    }
});