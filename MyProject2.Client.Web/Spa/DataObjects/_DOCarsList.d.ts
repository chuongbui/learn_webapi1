import xomega = require("xomega");
export declare class CarsList extends xomega.DataListObject {
    Id: xomega.IntegerProperty;
    Name: xomega.TextProperty;
    Quantity: xomega.DecimalProperty;
    Type: xomega.TextProperty;
    init(): void;
}
