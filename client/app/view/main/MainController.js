/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */

Ext.define('MyAdsApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    routes: {
        'ads': ''
    },

    init: function () {
        if (MyAdsApp.view.user.Firewall.isLoggedIn()) {
            var hash = window.location.hash;
            var itemId = hash.substring(1, hash.length);
            this.getView().setActiveTab(itemId);
        }
        else {
            this.redirectTo('ads');
        }
    },

    onLoginClicked: function () {
        Ext.create('MyAdsApp.view.user.Login').show();
    },

    onRegisterClicked: function () {
        Ext.create('MyAdsApp.view.user.Register').show();
    },

    onLogoutClicked: function () {
        MyAdsApp.view.user.Firewall.logout();
        sessionStorage.clear();
        window.location.reload();
    },

    onTabChange: function (tabPanel, tab) {
        if (tab.itemId) {
            this.redirectTo(tab.itemId);
        }
        else {
            this.redirectTo('ads');
        }
    }
});
