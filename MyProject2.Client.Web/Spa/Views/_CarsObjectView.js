//-------------------------------------------------------------------------
// This file was AUTO-GENERATED by an Xomega.Net generator.
//
// Changes to this file WILL BE LOST if the code is regenerated.
// To make changes to this file, PLEASE RENAME it and remove this caption.
//-------------------------------------------------------------------------
define(["require", "exports", "jquery", "knockout", "plugins/router", "xomega", "Spa/DataObjects/_DOCarsObject", "Spa/ServiceContracts/_Cars", "Spa/utils"], function (require, exports, $, ko, router, xomega, _DOCarsObject, _Cars, utils) {
    "use strict";
    var CarsObjectView = (function () {
        function CarsObjectView() {
            this.obj = new _DOCarsObject.CarsObject();
            this.isNew = ko.observable(true);
        }
        CarsObjectView.prototype.activate = function (Id, query) {
            this.obj.Id.InternalValue(Id);
            this.isNew(this.obj.Id.isNull());
            if (this.isNew()) {
                this.obj.Id.Required(false);
                this.obj.Modified(false);
            }
            else
                this.loadData();
        };
        CarsObjectView.prototype.canDeactivate = function () {
            // Note: Durandal may call this method twice for some reason.
            if (this.obj && this.obj.Modified()) {
                if (!confirm('Do you want to discard unsaved changes?'))
                    return false;
            }
            this.obj = null;
            return true;
        };
        CarsObjectView.prototype.loadData = function () {
            var _this = this;
            var url;
            url = this.obj.formatUrl("/cars/{id}");
            $.ajax(url, {
                success: function (data, textStatus, jqXHR) {
                    var json = jqXHR.responseJSON;
                    this.obj.fromJSON(json);
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    _this.obj.ValidationErrors.mergeWith(xomega.ErrorList.fromErrorResponse(jqXHR, errorThrow));
                },
                context: this
            });
        };
        CarsObjectView.prototype.onSave = function () {
            var _this = this;
            this.obj.validate(true);
            if (this.obj.ValidationErrors.hasErrors())
                return;
            var url;
            if (this.isNew()) {
                url = this.obj.formatUrl("/cars");
                $.ajax(url, {
                    type: "POST",
                    data: this.obj.toJSON(new _Cars.Cars_CreateInput()),
                    success: function (data, textStatus, jqXHR) {
                        var json = jqXHR.responseJSON;
                        this.obj.fromJSON(json);
                        this.isNew(false);
                        this.obj.Modified(false);
                        this.onSaved();
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        _this.obj.ValidationErrors.mergeWith(xomega.ErrorList.fromErrorResponse(jqXHR, errorThrow));
                    },
                    context: this
                });
            }
            else {
                url = this.obj.formatUrl("/cars/{id}");
                $.ajax(url, {
                    type: "PUT",
                    data: this.obj.toJSON(new _Cars.Cars_UpdateInput_Data()),
                    success: function (data, textStatus, jqXHR) {
                        var json = jqXHR.responseJSON;
                        this.obj.fromJSON(json);
                        this.obj.Modified(false);
                        this.onSaved();
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        _this.obj.ValidationErrors.mergeWith(xomega.ErrorList.fromErrorResponse(jqXHR, errorThrow));
                    },
                    context: this
                });
            }
        };
        CarsObjectView.prototype.onDelete = function () {
            var _this = this;
            if (!confirm("Are you sure you want to delete this object?\nThis operation cannot be undone."))
                return;
            var url;
            url = this.obj.formatUrl("/cars/{id}");
            $.ajax(url, {
                type: "DELETE",
                success: function (data, textStatus, jqXHR) {
                    this.onSaved();
                    this.onClose();
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    _this.obj.ValidationErrors.mergeWith(xomega.ErrorList.fromErrorResponse(jqXHR, errorThrow));
                },
                context: this
            });
        };
        CarsObjectView.prototype.onClose = function () {
            router.navigateBack();
        };
        CarsObjectView.prototype.onSaved = function () {
            var parent = utils.Routing.findParent(this);
            // notify save
            if (parent && parent.onChildDetailsSave)
                parent.onChildDetailsSave();
        };
        return CarsObjectView;
    }());
    return CarsObjectView;
});
//# sourceMappingURL=_CarsObjectView.js.map