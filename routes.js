angular.module('myApp.routes', [])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            name: 'view1',
            url: '/view1',
            controller: "View1Ctrl",
            templateUrl: 'templates/view1.html'
        });

        $stateProvider.state({
            name: 'view2',
            url: '/view2',
            controller: "View2Ctrl",
            templateUrl: 'templates/view2.html'
        });

        $urlRouterProvider.otherwise('/view1')

    });
