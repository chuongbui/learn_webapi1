//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by an Xomega.Net generator.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

import xomega = require("xomega");

export class CarsCriteria extends xomega.DataObject
{
    // Properties
    public Name: xomega.TextProperty;
    public NameOperator: xomega.OperatorProperty;
    public Quantity: xomega.DecimalProperty;
    public Quantity2: xomega.DecimalProperty;
    public QuantityOperator: xomega.OperatorProperty;
    public Type: xomega.TextProperty;
    public TypeOperator: xomega.OperatorProperty;

    // Construction and initialization
    init()
    {
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
    }
}
