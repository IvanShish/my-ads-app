Ext.define('MyAdsApp.view.ad.AdDetailsEdit', {
    extend: 'Ext.window.Window',

    requires: [
        'MyAdsApp.view.main.ImageUploadField'
    ],

    controller: 'ad-details-edit',

    title: 'Ad details edit',

    width: 600,

    height: 700,

    bodyPadding: 10,

    layout: 'anchor',

    modal: true,

    viewModel: {
        data: {
            ad: {
                title: '',
                description: '',
                price: 0,
                category: '',
                condition: '',
                adPicture: null
            }
        }
    },

    items: {
        itemId: 'adDetailsEdit',
        xtype: 'form',
        reference: 'form',

        defaults: {
            anchor: '100%',
            allowBlank: false
        },

        items: [
            {
                xtype: 'imageuploadfield',
                bind: {
                    previewImageSrc: '{ad.adPicture}'
                }
            },
            {
                xtype: 'textfield',
                name: 'title',
                fieldLabel: 'Title',
                bind: '{ad.title}'
            },
            {
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description',
                bind: '{ad.description}'
            },
            {
                xtype: 'numberfield',
                format: '0.00',
                minValue: 0,
                name: 'price',
                fieldLabel: 'Price',
                allowNegative: false,
                bind: '{ad.price}'
            },
            {
                xtype: 'textfield',
                name: 'category',
                fieldLabel: 'Category',
                bind: '{ad.category}'
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Condition',
                simpleValue: true,
                name: 'condition',
                bind: '{ad.condition}',
                items: [{
                    boxLabel: 'New',
                    inputValue: 'NEW'
                }, {
                    boxLabel: 'Used',
                    inputValue: 'USED'
                }]
            }
        ],

        buttons: [
            {
                text: 'Save',
                iconCls: 'far fa-save',
                formBind: true,
                handler: 'onSave'
            }
        ]
    },

    listeners: {
        show: 'onWindowShow'
    }
});