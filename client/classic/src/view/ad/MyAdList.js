Ext.define('MyAdsApp.view.ad.MyAdList', {
    extend: 'Ext.grid.Panel',

    xtype: 'my-ad-list',

    requires: [
        'MyAdsApp.store.Ad'
    ],

    controller: 'my-ad-list',

    viewModel: {
        stores: {
            myads: {
                type: 'my-ad'
            }
        }
    },

    title: 'My Ads',
    height: 850, 
    scrollable: true,

    bind: {
        store: '{myads}'
    },

    columns: {
        defaults: {
            flex: 1
        },
        items: [{
            text: 'Picture',
            dataIndex: 'adPicture',
            id: 'adPicture',
            flex: 3,
            renderer: function (value) {
                return '<img style="max-width:400px;" src="data:image/png;base64,' + value + '"/>';
            }
        },
        {
            text: 'Title',
            dataIndex: 'title',
            filter: 'string',
            flex: 2
        },
        {
            text: 'Description',
            dataIndex: 'description',
            filter: 'string',
            flex: 3
        },
        {
            text: 'Price',
            dataIndex: 'price',
            filter: 'number'
        },
        {
            text: 'Category',
            dataIndex: 'category',
            filter: 'string'
        },
        {
            text: 'Condition',
            dataIndex: 'condition',
            filter: {
                type: 'list',
                options: ['NEW', 'USED']
            }
        }]
    },

    listeners: {
        select: 'onItemSelected',
        deselect: 'onItemDeselected',
        itemmouseenter: function (view, record, item) {
            var state = record.getData().state;

            if (state === 'DELETED') {
                Ext.fly(item).set({ 'data-qtip': 'Ad removed' });
            }
        }
    },

    selModel: {
        allowDeselect: true
    },

    dockedItems: [{
        xtype: 'toolbar',
        defaults: {
            disabled: true
        },
        items: [{
            itemId: 'edit',
            text: 'Edit',
            iconCls: 'fas fa-edit',
            handler: 'onEdit'
        },
            '-',
        {
            itemId: 'delete',
            text: 'Delete',
            iconCls: 'x-fa fa-minus-circle',
            handler: 'onDelete'
        },
            '-',
        {
            itemId: 'publish',
            text: 'Publish',
            handler: 'onPublish'
        },
            '-',
        {
            itemId: 'unpublish',
            text: 'Unpublish',
            handler: 'onUnpublish'
        }]
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    },

    viewConfig: {
        getRowClass: function (record, index) {
            var state = record.getData().state;

            return state === 'DELETED' ? 'deleted' : ''
        }
    }
});
