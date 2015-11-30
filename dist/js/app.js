(function (angular) {
    'use strict';
    angular.module('app', ['ngSanitize', 'angular.collapse']);
    angular.element(document).ready(function () {
        if (!window.angularApp) {
            window.angularApp = angular.bootstrap(document, ['app']);
        }
    });
}(window.angular));

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
                    url: 'http://nethouse.ru'
                },
                {
                    title: 'Settings',
                    icon: '-icon-font-store',
                    items: [{
                        title: 'Common',
                        url: 'http://nethouse.ru'
                    }, {
                        title: 'Orders',
                        url: 'http://nethouse.ru'
                    }]
                }]
        };
    });
}(window.angular));
