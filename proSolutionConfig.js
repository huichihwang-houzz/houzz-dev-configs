'use strict';

module.exports = {
    serverConfig: {
        httpPort: 3344,
        httpsPort: 4011,
        apps: [
            //     ... insert here if you only need to start certain apps.
            //     e.g. 'apps/pro-solutions-home'  // this is different from jukwaa, which doesn't prefix 'apps/'
            //     if you want to start all the apps, remove 'apps [..]'

            //pro onboarding process
            'apps/houzz-pro-landing',
            'apps/pro-onboarding',

            //pro homepage
            'apps/pro-solutions-home',
            'apps/pro-solutions-referral',

            //proplus-self-serve
            'apps/proplus-self-serve',

            //proplus-manager
            'apps/proplus-manager',
            'apps/proplus-subscription',

            // test app
            'apps/pro-solutions-test-app',

            // ajax
            'apps/pro-solutions-chrome',
            'apps/pro-solutions-auth-exchange',
        ],
    },

    featureConfig: {
        // disableJukwaaConfig: true,
        // enableRemoteConfigPolling: true,
        // enableDynamicConfigPolling: true,
        // enableABTestPolling: true,
        // remoteConfigPollingInterval: 5 * 60 * 1000, // 5 minutes
        // dynamicConfigPollingInterval: 7 * 60 * 1000, // 7 minutes
        // abTestPollingInterval: 10 * 60 * 1000, // 10 minutes
    },

    system: {
        // graphouzzHost: 'http://www.houzzdev.com', //for local jukwaa graph
        thriftHost: 'c2-thrift-main.stghouzz.k8s-houzz.stghouzz.com',
        thriftPort: 8094,
        internalHostName: 'www.stghouzz.com',
        supportedLocales: [
            'en-US',
            'en-GB',
            'en-AU',
            'de-DE',
            'fr-FR',
            'ru-RU',
            'ja-JP',
            'it-IT',
            'es-ES',
            'da-DK',
            'nb-NO',
            'fi-FI',
            'sv-SE',
            'en-IE',
            'en-NZ',
            'en-SG',
            'en-IN',
            'de-AT',
            'nl-NL',
        ],
    },

    webpack: {
        buildApps: [
            // ...
        ],
    },
};
