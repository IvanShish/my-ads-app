Ext.define('MyAdsApp.view.ad.AdList', {
    extend: 'Ext.grid.Panel',

    xtype: 'ad-list',

    width: '100%',

    requires: [
        'MyAdsApp.store.Ad'
    ],

    controller: 'ad-list',

    viewModel: 'main',

    plugins: 'gridfilters',

    title: 'Ads (only published)',

    bind: {
        store: '{ads}'
    },

    reference: 'adlist',
    columnLines: false,

    columns: {
        items: [{
            text: 'Picture',
            dataIndex: 'adPicture',
            width: 800,
            locked: true,
            renderer: function (value) {
                return '<img style="max-width:400px;" src="data:image/png;base64,' + value + '"/>';
            }
        },
        {
            width: 200,
            text: 'Title',
            dataIndex: 'title',
            filter: 'string'
        },
        {
            width: 250,
            text: 'Description',
            dataIndex: 'description',
            filter: 'string'
        },
        {
            width: 100,
            text: 'Price',
            dataIndex: 'price',
            filter: 'number',
            renderer: function (value, metaData, record) {
                return Math.round(value * 100) / 100;
            }
        },
        {
            width: 150,
            text: 'Category',
            dataIndex: 'category',
            filter: 'string'
        },
        {
            width: 80,
            text: 'Condition',
            dataIndex: 'condition',
            filter: {
                type: 'list',
                options: ['NEW', 'USED']
            }
        },
        {
            width: 150,
            text: 'Seller name',
            dataIndex: 'sellerName',
            filter: 'string'
        }]
    },

    selModel: {
        allowDeselect: true
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [
            'Per Page: ',
            {
                xtype: 'combobox',
                name: 'perpage',
                width: 80,
                store: new Ext.data.ArrayStore({
                    fields: ['id'],
                    data: [
                        ['20'],
                        ['40'],
                        ['80'],
                        ['100']
                    ]
                }),
                mode: 'local',
                value: '20',
                listWidth: 40,
                triggerAction: 'all',
                displayField: 'id',
                valueField: 'id',
                editable: false,
                forceSelection: true,
                listeners: {
                    'select': 'onComboSelect'
                }
            }, '-',
            {
                itemId: 'chat',
                iconCls: 'far fa-envelope',
                handler: 'onChat',
                disabled: true,
                hidden: true,
                bind: {
                    disabled: '{!adlist.selection}',
                    hidden: '{!isUserLoggedIn}'
                }
            }]
    }],

    header: {
        itemPosition: 1,
        items: [{
            xtype: 'ad-search'
        }]
    },

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
