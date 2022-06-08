Ext.define('MyAdsApp.view.ad.AdSearch', {
    extend: 'Ext.panel.Panel',

    requires: [
        'MyAdsApp.store.Ad'
    ],

    xtype: 'ad-search',

    title: 'Search ads',
    width: '80%',
    bodyPadding: 5,

    controller: 'ad-search',
    viewModel: 'main',

    collapsed: true,
    collapsible: true,

    items: {
        itemId: 'adSearchForm',
        xtype: 'form',
        reference: 'form',
        defaults: {
            width: '100%',
            listeners: {
                specialkey: 'onKeyPressed'
            }
        },
        items: [
            {
                xtype: 'textfield',
                name: 'title',
                fieldLabel: 'Title',
            },
            {
                xtype: 'textfield',
                name: 'category',
                fieldLabel: 'Category',
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Condition',
                name: 'condition',
                simpleValue: true,
                items: [{
                    boxLabel: 'New',
                    inputValue: 'NEW'
                }, {
                    boxLabel: 'Used',
                    inputValue: 'USED'
                }]
            },
            {
                xtype: 'numberfield',
                minValue: 0.0,
                name: 'priceFrom',
                fieldLabel: 'Price from'
            },
            {
                xtype: 'numberfield',
                minValue: 0.0,
                name: 'priceUntil',
                fieldLabel: 'Price until'
            }
        ],

        buttons: [{
            text: 'Reset',
            iconCls: 'fa fa-trash',
            handler: 'onResetClicked'
        },
        {
            text: 'Search',
            iconCls: 'fas fa-search',
            formBind: true,
            handler: 'onSearchClicked'
        }]
    }
});
