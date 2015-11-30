(function (angular) {
    'use strict';
    angular.module('app', ['ngSanitize', 'angular.collapse']);
    angular.element(document).ready(function () {
        if (!window.angularApp) {
            window.angularApp = angular.bootstrap(document, ['app']);
        }
    });
}(window.angular));
