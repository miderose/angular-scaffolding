angular.module('myApp.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            name: 'login',
            url: '/login',
            controller: "loginCtrl",
            templateUrl: 'templates/login.html'
        });

        $stateProvider.state({
            name: 'app',
            url: '/app',
            abstract: true,
            templateUrl: 'templates/app.html'
            //controller: "View1Ctrl",
        });

        $stateProvider.state({
            name: 'app.view1',
            url: '/view1',
            controller: "View1Ctrl",
            templateUrl: 'templates/view1.html'
        });

        $stateProvider.state({
            name: 'app.view2',
            url: '/view2',
            controller: "View2Ctrl",
            templateUrl: 'templates/view2.html'
        });

        $urlRouterProvider.otherwise('/login')

    });
