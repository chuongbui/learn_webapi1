define(["require", "exports", 'knockout', 'Spa/utils'], function (require, exports, ko, utils) {
    "use strict";
    var PagerWidget = (function () {
        function PagerWidget() {
        }
        PagerWidget.prototype.activate = function (settings) {
            this.settings = settings;
            // paginate items
            this.pageSizes = this.settings.pageSizes || [10, 25, 50, 100];
            this.pageSize = utils.Ko.observable(this.settings.pageSize, 25);
            this.curPage = utils.Ko.observable(this.settings.curPage, 1);
            this.maxPage = ko.computed(function () {
                return Math.ceil(this.settings.items().length / this.pageSize());
            }, this);
            this.maxPage.subscribe(function () {
                this.curPage(1);
            }, this);
            var pagerSize = this.settings.pagerSize || 5;
            var pagerOffset = Math.floor(pagerSize / 2);
            pagerSize = pagerOffset * 2 + 1; // ensure odd pager size
            this.pageFrom = ko.computed(function () {
                return Math.max(1, Math.min(this.maxPage() - pagerSize + 1, this.curPage() - pagerOffset));
            }, this);
            this.pageTo = ko.computed(function () {
                return Math.min(this.maxPage(), Math.max(pagerSize, this.curPage() + pagerOffset));
            }, this);
            this.pagedItems = ko.computed(function () {
                var page = this.curPage(), start = this.pageSize() * (page - 1), end = start + this.pageSize();
                return this.settings.items().slice(start, end);
            }, this);
        };
        return PagerWidget;
    }());
    return PagerWidget;
});
//# sourceMappingURL=viewmodel.js.map