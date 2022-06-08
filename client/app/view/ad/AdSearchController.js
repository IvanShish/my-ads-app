Ext.define('MyAdsApp.view.ad.AdSearchController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ad-search',

    requires: ['Ext.ux.Mediator'],

    onSearchClicked: function (owner) {
        var form = owner.up('#adSearchForm');
        var values = form.getForm().getValues();
        Ext.ux.Mediator.fireEvent('adsearch', values);
    },

    onResetClicked: function(owner) {
        owner.up('#adSearchForm').reset();
    },

    onKeyPressed: function (field, event) {
        if (event.getKey() === event.ENTER) {
            this.onSearchClicked(field);
        }
    }
});