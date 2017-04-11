'use strict';

appControllers.controller('loginCtrl', function ($scope, $state) {
    console.log("loginCtrl");

    $scope.formData = {};

    $scope.login = function () {
        if ($scope.formData.email && $scope.formData.password) {
            console.log("auth ok");

            $state.go("app.view1")
        } else {
            $scope.errorMsg = "Error!"
        }
    };

});
