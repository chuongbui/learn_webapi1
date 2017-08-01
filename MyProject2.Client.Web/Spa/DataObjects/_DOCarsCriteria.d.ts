import xomega = require("xomega");
export declare class CarsCriteria extends xomega.DataObject {
    Name: xomega.TextProperty;
    NameOperator: xomega.OperatorProperty;
    Quantity: xomega.DecimalProperty;
    Quantity2: xomega.DecimalProperty;
    QuantityOperator: xomega.OperatorProperty;
    Type: xomega.TextProperty;
    TypeOperator: xomega.OperatorProperty;
    init(): void;
}
