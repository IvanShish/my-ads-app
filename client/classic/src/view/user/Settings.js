Ext.define('MyAdsApp.view.user.Settings', {
    extend: 'Ext.form.Panel',

    xtype: 'user-settings',

    controller: 'user-settings',

    url: serverUrl + '/api/users',

    jsonSubmit: true,

    title: 'User settings',

    bodyPadding: 10,

    fullscreen: true,

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',

    defaults: {
        anchor: '100%',
        allowBlank: false,
    },

    viewModel: {
        type: 'main'
    },

    items: [
        {
            xtype: 'textfield',
            name: 'firstName',
            fieldLabel: 'First name',
            bind: '{user.firstName}'
        },
        {
            xtype: 'textfield',
            name: 'lastName',
            fieldLabel: 'Last name',
            bind: '{user.lastName}'
        }
    ],

    buttons: [
        {
            text: 'Save',
            formBind: true,
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