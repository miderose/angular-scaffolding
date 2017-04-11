'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router',
        'myApp.routes',
        'myApp.controllers',
        'myApp.services',
        "ngSanitize",
        "pascalprecht.translate"
    ])

    .config(function ($translateProvider) {
        $translateProvider
            .registerAvailableLanguageKeys(['it', 'en'], {
                'it-*': 'it',
                'en-*': 'en'
            })

            .translations('it', it)
            .translations('en', en)

            .uniformLanguageTag('bcp47')
            .fallbackLanguage('en-EN')
            .useSanitizeValueStrategy("sanitize")
            .determinePreferredLanguage();
    })

    .run(function ($rootScope, $translate,
                   APP_VERSION, LOCALSTORAGE_PREFERRED_LANGUAGE_KEY) {
        console.log(".run");

        $rootScope.appVersion = APP_VERSION;

        $rootScope.usedLanguage = $translate.use();

        $rootScope.changeLanguage = function (langKey) {
            // use the langKey, then save it on localStorage.
            $translate.use(langKey);
            localStorage.setItem(LOCALSTORAGE_PREFERRED_LANGUAGE_KEY, langKey);

            $rootScope.usedLanguage = $translate.use();
        };

        // check if there is a saved languageKey: if yes use it!
        var preferredLanguageKey = localStorage.getItem(LOCALSTORAGE_PREFERRED_LANGUAGE_KEY);
        if (preferredLanguageKey) {
            $rootScope.changeLanguage(preferredLanguageKey);
        }
    })

;
