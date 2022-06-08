Ext.define('MyAdsApp.view.user.Login', {
    extend: 'Ext.window.Window',

    xtype: 'login',

    requires: [
        'Ext.form.Panel'
    ],

    title: 'Login in',

    controller: 'login',

    bodyPadding: 10,

    autoShow: true,

    resizable: false,

    draggable: false,

    modal: true,

    width: '50%',

    items: {
        itemId: 'loginForm',
        xtype: 'form',
        reference: 'form',
        defaults: { width: 400, allowBlank: false },
        defaultType: 'textfield',
        items: [{
            name: 'email',
            fieldLabel: 'Email',
        },
        {
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            listeners: {
                specialkey: 'onKeyPressed'
            }
        },
        {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password'
        }],
        
        buttons: [{
            text: 'Login',
            formBind: true,
            handler: 'onLoginClicked'
        }]
    }
});