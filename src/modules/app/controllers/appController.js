(function (angular) {
    'use strict';
    angular.module('app').controller('appController', function () {
        this.isSmallMenu = true;
        this.menu = {
            logo: '-settings-sprite-logo',
            items: [
                {
                    title: 'Dashboard',
                    icon: '-icon-font-stack',
                    url: 'http://google.com'
                },
                {
                    title: 'Settings',
                    icon: '-icon-font-store',
                    items: [{
                        title: 'Common',
                        url: 'http://google.com'
                    }, {
                        title: 'Orders',
                        url: 'http://google.com'
                    }]
                }]
        };
    });
}(window.angular));
