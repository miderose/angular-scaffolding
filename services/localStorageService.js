appServices.factory("$localStorageService", function () {
    var service = {};

    service.getObject = function (key, defaultValue) {
        var objRetrieved = localStorage.getItem(key);

        if (!objRetrieved) {
            return defaultValue ? defaultValue : null;
        }

        return JSON.parse(objRetrieved);
    };

    service.setObject = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    service.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };

    service.getItem = function (key, defaultValue) {
        var objRetrieved = localStorage.getItem(key);

        if (!objRetrieved) {
            return defaultValue ? defaultValue : null;
        }

        return objRetrieved;
    };

    return service;
});
