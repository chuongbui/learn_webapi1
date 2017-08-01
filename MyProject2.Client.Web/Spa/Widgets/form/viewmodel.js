define(["require", "exports", 'jquery', 'plugins/router', 'Spa/utils'], function (require, exports, $, router, utils) {
    "use strict";
    var FormWidget = (function () {
        function FormWidget() {
        }
        FormWidget.prototype.activate = function (settings) {
            this.settings = settings;
            // Note: Only show as dialog if there is a parent context additionally to the flag.
            this.dialog = this.isDialog() && utils.Routing.findParent(settings.bindingContext.$root);
        };
        FormWidget.prototype.attached = function () {
            if (this.isFitted()) {
                $(this.settings.child).addClass('fit');
                utils.Layout.fitForm($(this.settings.child));
            }
            if (this.dialog) {
                $(this.settings.child).addClass('dialog');
                $('.overlay').fadeTo(200, 0.3);
            }
        };
        FormWidget.prototype.detached = function () {
            // Note: Durandal can detach parent first, making dynamic 
            // verification of the dialog flag impossible at this point.
            if (this.dialog) {
                $('.overlay').fadeOut(100);
            }
        };
        FormWidget.prototype.close = function () {
            var host = this.settings.bindingContext.$root;
            if (typeof host.onClose == 'function')
                host.onClose();
            else {
                router.navigateBack();
            }
        };
        FormWidget.prototype.isFitted = function () {
            return typeof this.settings.fit == 'boolean' && this.settings.fit;
        };
        FormWidget.prototype.isDialog = function () {
            return typeof this.settings.dialog == 'boolean' && this.settings.dialog;
        };
        return FormWidget;
    }());
    return FormWidget;
});
//# sourceMappingURL=viewmodel.js.map