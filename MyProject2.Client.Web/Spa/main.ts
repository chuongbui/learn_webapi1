// configure RequireJS module loader
require.config({
    baseUrl: '/',
    paths: {
        'text': '../Scripts/text',
        'jquery': '../Scripts/jquery-2.1.3',
        'knockout': '../Scripts/knockout-3.3.0',
        'moment': '../Scripts/moment',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'xomega': '../Scripts/xomega-1.0.0',
        'widgets': '../Spa/Widgets',
    }
});

// Main
define(['durandal/app', 'durandal/system'], function (app, system) {

    // Configure and run Durandal application

    system.debug(true); // enable output of debug messages to console

    app.title = document.title;

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start()
        .then(function () {
            app.setRoot('Spa/Views/shell'); // load the main view
        });
});
