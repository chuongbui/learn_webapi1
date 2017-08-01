define(["require", "exports", 'Spa/utils'], function (require, exports, utils) {
    "use strict";
    var PanelWidget = (function () {
        function PanelWidget() {
        }
        PanelWidget.prototype.activate = function (settings) {
            this.settings = settings;
            this.expanded = utils.Ko.observable(this.settings.expanded, true);
        };
        return PanelWidget;
    }());
    return PanelWidget;
});
//# sourceMappingURL=viewmodel.js.map