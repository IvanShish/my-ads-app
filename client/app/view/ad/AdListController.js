Ext.define('MyAdsApp.view.ad.AdListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ad-list',

    requires: ['Ext.ux.Mediator'],

    init: function () {
        Ext.ux.Mediator.on('adsearch', this.filterAds, this);
    },

    onChat: function () {
        var grid = this.getView();
        var selection = grid.getSelectionModel().getSelection()[0];

        if (selection) {
            if (!this.chatWindow) {
                this.chatWindow = Ext.create('MyAdsApp.view.user.chat.ChatWindow', {
                    recordRef: selection,
                }).show();
            }
            else {
                Ext.GlobalEvents.fireEvent('new_contact', selection);
            }
        }
        grid.getSelectionModel().deselectAll();
    },

    filterAds: function (filter) {
        var store = this.getViewModel().getStore('ads').load();
        store.clearFilter();

        if (!Ext.isEmpty(filter.title)) {
            store.filter({
                property: 'title',
                value: filter.title,
                operator: 'like'
            })
        }
        if (!Ext.isEmpty(filter.category)) {
            store.filter({
                property: 'category',
                value: filter.category,
                operator: 'like'
            })
        }
        if (!Ext.isEmpty(filter.condition)) {
            store.filter({
                property: 'condition',
                value: new Array(filter.condition),
                operator: 'in'
            })
        }

        if (!Ext.isEmpty(filter.priceFrom) && !Ext.isEmpty(filter.priceUntil)) {
            store.filter({
                property: 'price',
                value: new Array(filter.priceFrom, filter.priceUntil),
                operator: 'between'
            });
        }
        else {
            if (!Ext.isEmpty(filter.priceFrom)) {
                store.filter({
                    property: 'price',
                    value: filter.priceFrom,
                    operator: 'gt'
                })
            }
            if (!Ext.isEmpty(filter.priceUntil)) {
                store.filter({
                    property: 'price',
                    value: filter.priceUntil,
                    operator: 'lt'
                })
            }
        }

        store.filter({
            property: 'state',
            value: 'ACTIVELY',
            operator: 'eq'
        });

        store.filter({
            property: 'user',
            value: sessionStorage.getItem('userId'),
            operator: 'neq'
        });

        store.sync();
    },

    onComboSelect: function (combo, record) {
        var store = this.getViewModel().getStore('ads').load();
        store.setPageSize(parseInt(record.get('id'), 10));
    }
});