"use strict";

module.exports = {
  serverConfig: {
    httpPort: 3344,
    httpsPort: 4011,
    apps: [
      //     ... insert here if you only need to start certain apps.
      //     e.g. 'apps/pro-solutions-home'  // this is different from jukwaa, which doesn't prefix 'apps/'
      //     if you want to start all the apps, remove 'apps [..]'
      "apps/proplus-manager",
      "apps/proplus-subscription",
      "apps/houzz-pro-landing"
    ]
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
    thriftHost: "stghouzz-nodejs.staging.houzz.net",
    thriftPort: 8094,
    internalHostName: "www.stghouzz.com",
    supportedLocales: [
      "en-US",
      "en-GB",
      "en-AU",
      "de-DE",
      "fr-FR",
      "ru-RU",
      "ja-JP",
      "it-IT",
      "es-ES",
      "da-DK",
      "nb-NO",
      "fi-FI",
      "sv-SE",
      "en-IE",
      "en-NZ",
      "en-SG",
      "en-IN",
      "de-AT",
      "nl-NL"
    ]
  },

  webpack: {
    buildApps: [
      // ...
    ]
  }
};
