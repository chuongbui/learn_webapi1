define(["require", "exports"], function (require, exports) {
    "use strict";
    var MessageListWidget = (function () {
        function MessageListWidget() {
        }
        MessageListWidget.prototype.activate = function (settings) {
            this.settings = settings;
        };
        MessageListWidget.prototype.iconClass = function (severity) {
            return severity == 1 ? 'fa-times-circle' : severity == 2 ? 'fa-exclamation-circle' : 'fa-info-circle';
        };
        return MessageListWidget;
    }());
    return MessageListWidget;
});
//# sourceMappingURL=viewmodel.js.map