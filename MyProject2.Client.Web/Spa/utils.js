define(["require", "exports", 'jquery', 'knockout', 'plugins/router', "xomega"], function (require, exports, $, ko, router, xomega) {
    "use strict";
    var Xomega;
    (function (Xomega) {
        function configure() {
            xomega.DateTimeProperty.DefaultEditFormat = 'M/D/YYYY HH:mm';
            xomega.DateProperty.DefaultEditFormat = 'M/D/YYYY';
            xomega.TimeProperty.DefaultEditFormat = 'HH:mm';
        }
        Xomega.configure = configure;
    })(Xomega = exports.Xomega || (exports.Xomega = {}));
    var Routing;
    (function (Routing) {
        function findRootRoute(route) {
            var queryIndex = route.indexOf('?');
            if (queryIndex != -1)
                route = route.substring(0, queryIndex);
            route = route.replace(/\/$/, '');
            for (var i = 0; i < router.handlers.length; i++) {
                var current = router.handlers[i];
                if (current.routePattern.test(route))
                    return router.routes[i];
            }
            return { route: 'not-found' };
        }
        Routing.findRootRoute = findRootRoute;
        function findParent(child) {
            var parent = null;
            var model = router.activeItem();
            while (model && model !== child && model.router) {
                parent = model;
                model = model.router.activeItem();
            }
            return parent;
        }
        Routing.findParent = findParent;
    })(Routing = exports.Routing || (exports.Routing = {}));
    var Layout;
    (function (Layout) {
        function init() {
            // register event handlers
            $(window).resize(function () {
                fitForm($('.form.fit'));
            });
        }
        Layout.init = init;
        function fitForm($form) {
            if (!$form)
                return;
            var $header = $('#spa > header');
            var $main = $('#spa > #main');
            var main_padding = parseInt($main.css('padding-top'), 10) + parseInt($main.css('padding-bottom'), 10);
            var min_height = $(window).height() - $header.outerHeight() - main_padding;
            var border = $form.outerHeight() - $form.innerHeight();
            $form.css('min-height', min_height - border - 1); // Note: one px less to avoid rounding issues causing a scrollbar
        }
        Layout.fitForm = fitForm;
    })(Layout = exports.Layout || (exports.Layout = {}));
    var UI;
    (function (UI) {
        function appliedCriteriaTooltip(ac) {
            if (ac == null)
                return '';
            var tooltip = '';
            for (var i = 0; i < ac.length; i++) {
                var fc = ac[i];
                if (tooltip)
                    tooltip += '; ';
                tooltip += fc.Label + ':' + (fc.Operator ? ' ' + fc.Operator : '') + (fc.Data.length > 0 ? ' ' + fc.Data.join(' and ') : '');
            }
            return tooltip;
        }
        UI.appliedCriteriaTooltip = appliedCriteriaTooltip;
    })(UI = exports.UI || (exports.UI = {}));
    var Ko;
    (function (Ko) {
        function observable(val, def) {
            return ko.isObservable(val) ? val : ko.observable(val || def);
        }
        Ko.observable = observable;
    })(Ko = exports.Ko || (exports.Ko = {}));
});
//# sourceMappingURL=utils.js.map