//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by an Xomega.Net generator.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "xomega"], function (require, exports, xomega) {
    "use strict";
    var CarsCriteria = (function (_super) {
        __extends(CarsCriteria, _super);
        function CarsCriteria() {
            _super.apply(this, arguments);
        }
        // Construction and initialization
        CarsCriteria.prototype.init = function () {
            this.Name = new xomega.TextProperty();
            this.Name.Size = 50;
            this.NameOperator = new xomega.OperatorProperty();
            this.NameOperator.Size = 10;
            this.NameOperator.EnumType = "operators";
            this.NameOperator.HasNullCheck = true;
            this.Quantity = new xomega.DecimalProperty();
            this.Quantity2 = new xomega.DecimalProperty();
            this.QuantityOperator = new xomega.OperatorProperty();
            this.QuantityOperator.Size = 10;
            this.QuantityOperator.EnumType = "operators";
            this.QuantityOperator.HasNullCheck = true;
            this.Type = new xomega.TextProperty();
            this.Type.Size = 50;
            this.TypeOperator = new xomega.OperatorProperty();
            this.TypeOperator.Size = 10;
            this.TypeOperator.EnumType = "operators";
            this.TypeOperator.HasNullCheck = true;
        };
        return CarsCriteria;
    }(xomega.DataObject));
    exports.CarsCriteria = CarsCriteria;
});
//# sourceMappingURL=_DOCarsCriteria.js.map