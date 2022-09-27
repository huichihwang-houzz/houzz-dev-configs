'use strict';

module.exports = {
    system: {
        // Server Port Config
        // httpPort: 3333,
        // httpsPort: 4000,

        // Tunnel to stghouzz
        // test with
        // curl -H "Host: c2-thrift-php7-main.stghouzz.svc.cluster.local"  internal-a7b6cfdc1e0954f0e89a5984a1a7cd35-1242724363.us-west-2.elb.amazonaws.com:8094/AdServerHealthCheck.php
        // thriftHost: 'internal-a7b6cfdc1e0954f0e89a5984a1a7cd35-1242724363.us-west-2.elb.amazonaws.com',
        // thriftPort: 8094,

        // Tunnel to houzz2
        // thriftHost: 'houzz2-nodejs.stg',
        // thriftPort: 8094,

        // Docker C2 setup
        // thrift host
        // thriftHost: 'localhost',

        // thrift port
        // thriftPort: 80,

        // enable thrift debug
        // thriftDebug: '?XDEBUG_SESSION_START=netbeans-xdebug',

        // Vagrant C2 setup
        // thriftHost: '192.168.33.10',
        // thriftHost: 'www.houzzdev.com',
        // thriftPort: 80,
        // thriftDebug: '?XDEBUG_SESSION_START=netbeans-xdebug',

        // enable proxy go through staging
        // internalHostName: 'www.stghouzz.com',

        //build for which locales
        //supportedLocales: ['en-US', 'en-GB', 'en-AU', 'de-DE', 'fr-FR', 'ru-RU', 'ja-JP', 'it-IT', 'es-ES', 'da-DK', 'nb-NO', 'fi-FI', 'sv-SE', 'en-IE', 'en-NZ', 'en-SG', 'en-IN', 'de-AT', 'nl-NL']
    },

    apps: [
        // core functions
        'common-actions',
        'core-infra',
        'cart',
        'auth-exchange',
        '../node_modules/@houzz/graphouzz',
        'graphouzz-middlelayer',
        'notifications',
        'authorization',
        'design-editor',
        'pro-solutions-fallback',
        'visual-tools',
    ]
};
