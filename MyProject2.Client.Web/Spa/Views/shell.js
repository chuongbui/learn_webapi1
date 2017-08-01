define(["require", "exports", 'Spa/routes', 'Spa/utils'], function (require, exports, routeCfg, utils) {
    "use strict";
    var Shell = (function () {
        function Shell() {
            this.app = require('durandal/app');
            this.router = require('plugins/router');
        }
        Shell.prototype.activate = function () {
            utils.Xomega.configure();
            utils.Layout.init();
            // activate router
            return this.router
                .map(routeCfg.Routes)
                .buildNavigationModel()
                .activate();
        };
        return Shell;
    }());
    return Shell;
});
//# sourceMappingURL=shell.js.map