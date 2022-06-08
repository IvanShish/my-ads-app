Ext.define('MyAdsApp.view.user.Register', {
    extend: 'Ext.window.Window',

    xtype: 'register',

    requires: [
        'Ext.form.Panel'
    ],

    title: 'Registration',

    controller: 'register',

    bodyPadding: 20,

    autoShow: true,

    resizable: false,

    draggable: false,

    modal: true,

    width: 500,

    autoSize: true,

    items: {
        itemId: 'registerForm',
        xtype: 'form',
        reference: 'form',
        defaults: { width: 400, allowBlank: false },
        defaultType: 'textfield',
        items: [{
            name: 'email',
            fieldLabel: 'Email'
        },
        {
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password'
        },
        {
            name: 'firstName',
            fieldLabel: 'First name'
        },
        {
            name: 'lastName',
            fieldLabel: 'Last name'
        }],

        buttons: [{
            text: 'Reset',
            iconCls: 'fa fa-trash',
            handler: 'onResetClicked'
        },
        {
            text: 'Register',
            formBind: true,
            handler: 'onRegisterClicked'
        }]
    }
});