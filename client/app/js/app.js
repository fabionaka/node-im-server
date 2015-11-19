'use strict';
angular.element(document).ready(function () {
    var requires = [
        'ngAnimate',
        'ui.router',
        'app.directives',
        'app.controllers',
        'app.services',
        'app.factories',
        'app.providers',
        'app.filters'
    ];
    var app = angular.module("app", requires)
            .constant('appSettings', {
                appName: 'app test'
            })
            .constant('userData', {
                alias: 'fabion',
                name: 'Fábio Nakatani'
            })
            .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

                /*
                 * ROTAS
                 */
                $locationProvider.html5Mode(false);
                $stateProvider
                        .state('Index', {
                            url: '/',
                            title: 'Main Content',
                            templateUrl: 'views/userlist.html',
                            controller: 'helloCtrl'
                        });
                $urlRouterProvider.otherwise('/');
                /*
                 * ROTAS
                 */
            })
            .run(function ($rootScope, appSettings, userData) {

                $rootScope.appInfo = {
                    name: appSettings.appName,
                    version: '0.1.0'
                };

                

            });


    angular.bootstrap(document, ['app']);
});