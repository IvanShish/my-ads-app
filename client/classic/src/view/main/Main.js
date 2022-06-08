/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 */
Ext.define('MyAdsApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'MyAdsApp.view.user.chat.Chat'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    listeners: {
        tabchange: 'onTabChange'
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    tbar: [
        '->',
        {
            text: 'Logout',
            iconCls: 'fas fa-sign-out-alt',
            hidden: true,
            listeners: {
                click: 'onLogoutClicked'
            },
            bind: {
                hidden: '{!isUserLoggedIn}'
            }
        },
        {
            text: 'Login',
            iconCls: 'fas fa-sign-in-alt',
            hidden: true,
            listeners: {
                click: 'onLoginClicked'
            },
            bind: {
                hidden: '{isUserLoggedIn}'
            }
        },
        {
            text: 'Register',
            iconCls: 'fas fa-user-plus',
            hidden: true,
            listeners: {
                click: 'onRegisterClicked'
            },
            bind: {
                hidden: '{isUserLoggedIn}'
            }
        }
    ],

    items: [{
        title: 'Ads',
        iconCls: 'fa-home',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'ad-list'
        }]
    }, {
        itemId: 'user-place-ad',
        title: 'Place an ad',
        iconCls: 'x-fa fa-plus-circle',
        items: [{
            xtype: 'ad-details'
        }],
        hidden: true,
        tabConfig: {
            bind: {
                hidden: '{!isUserLoggedIn}'
            }
        }
    }, {
        itemId: 'user-messages',
        title: 'Messages',
        iconCls: 'far fa-comment',
        items: [{
            id: 'chat',
            xtype: 'chat'
        }],
        hidden: true,
        tabConfig: {
            bind: {
                hidden: '{!isUserLoggedIn}'
            }
        }
    }, {
        itemId: 'user-me',
        title: 'Me',
        iconCls: 'far fa-user',
        items: [{
            xtype: 'user-settings'
        }],
        hidden: true,
        tabConfig: {
            bind: {
                hidden: '{!isUserLoggedIn}'
            }
        }
    },
    {
        itemId: 'user-my-ads',
        title: 'My ads',
        iconCls: 'fas fa-ad',
        items: [{
            xtype: 'my-ad-list'
        }],
        hidden: true,
        tabConfig: {
            bind: {
                hidden: '{!isUserLoggedIn}'
            }
        }
    }]
});
