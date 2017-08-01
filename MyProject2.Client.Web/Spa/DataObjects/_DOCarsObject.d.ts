import xomega = require("xomega");
export declare class CarsObject extends xomega.DataObject {
    Id: xomega.IntegerProperty;
    Name: xomega.TextProperty;
    Quantity: xomega.DecimalProperty;
    Type: xomega.TextProperty;
    init(): void;
}
