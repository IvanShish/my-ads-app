Ext.define('MyAdsApp.view.ad.AdDetails', {
    extend: 'Ext.form.Panel',

    xtype: 'ad-details',

    requires: [
        'MyAdsApp.store.Ad',
    ],

    controller: 'ad-details',

    viewModel: {},

    url: serverUrl + '/api/ads',

    title: 'Place an ad',

    jsonSubmit: true,

    fullscreen: true,

    bodyPadding: 10,

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',

    defaults: {
        anchor: '100%',
        allowBlank: false,
    },

    items: [
        {
            xtype: 'textfield',
            name: 'title',
            fieldLabel: 'Title'
        },
        {
            xtype: 'textfield',
            name: 'description',
            fieldLabel: 'Description'
        },
        {
            xtype: 'numberfield',
            minValue: 0.0,
            step: 0.1,
            name: 'price',
            fieldLabel: 'Price'
        },
        {
            xtype: 'textfield',
            name: 'category',
            fieldLabel: 'Category'
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Condition',
            items: [{
                boxLabel: 'New',
                name: 'condition',
                inputValue: 'NEW'
            }, {
                boxLabel: 'Used',
                name: 'condition',
                inputValue: 'USED'
            }]
        },
        {
            xtype: 'filefield',
            fieldLabel: 'Select picture',
            name: 'file',
            draggable: true,
            allowBlank: true,
            listeners: {
                change: function (field) {
                    const dom = Ext.getDom(field.fileInputEl);
                    const container = field.up('container');
                    const viewModel = container.getViewModel();
                    const file = dom.files[0];
                    viewModel.set('imgData', file);
                }
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'userId',
            value: MyAdsApp.view.user.UserStorage.retrieveUserId()
        }
    ],

    buttons: [
        {
            text: 'Save',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            iconCls: 'far fa-save',
            handler: 'onSave'
        },
        {
            text: 'Reset',
            iconCls: 'fa fa-trash',
            handler: 'onReset'
        }
    ]
});