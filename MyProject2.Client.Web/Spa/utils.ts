import $ = require('jquery');
import ko = require('knockout');
import router = require('plugins/router');
import xomega = require("xomega");

export module Xomega {

    export function configure(): void {
        xomega.DateTimeProperty.DefaultEditFormat = 'M/D/YYYY HH:mm';
        xomega.DateProperty.DefaultEditFormat = 'M/D/YYYY';
        xomega.TimeProperty.DefaultEditFormat = 'HH:mm';
    }
}

export module Routing {

    export function findRootRoute(route: string): DurandalRouteConfiguration {
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

    export function findParent(child: any): any {
        var parent = null;
        var model = router.activeItem();
        while (model && model !== child && model.router) {
            parent = model;
            model = model.router.activeItem();
        }
        return parent;
    }
}

export module Layout {

    export function init() {
        // register event handlers
        $(window).resize(function () {
            fitForm($('.form.fit'));
        });
    }

    export function fitForm($form: JQuery) {
        if (!$form) return;
        var $header = $('#spa > header');
        var $main = $('#spa > #main');
        var main_padding = parseInt($main.css('padding-top'), 10) + parseInt($main.css('padding-bottom'), 10);
        var min_height = $(window).height() - $header.outerHeight() - main_padding;
        var border = $form.outerHeight() - $form.innerHeight();
        $form.css('min-height', min_height - border - 1); // Note: one px less to avoid rounding issues causing a scrollbar
    }
}

export module UI {

    export function appliedCriteriaTooltip(ac: Array<xomega.FieldCriteria>): string {
        if (ac == null) return '';
        var tooltip: string = '';
        for (var i = 0; i < ac.length; i++) {
            var fc: xomega.FieldCriteria = ac[i];
            if (tooltip) tooltip += '; ';
            tooltip += fc.Label + ':' + (fc.Operator ? ' ' + fc.Operator : '') + (fc.Data.length > 0 ? ' ' + fc.Data.join(' and ') : '');
        }
        return tooltip;
    }
}

export module Ko {

    export function observable(val, def): KnockoutObservable<any> {
        return ko.isObservable(val) ? val : ko.observable(val || def);
    }
}
