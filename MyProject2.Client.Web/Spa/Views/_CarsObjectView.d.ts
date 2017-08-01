import _DOCarsObject = require("Spa/DataObjects/_DOCarsObject");
declare class CarsObjectView {
    obj: _DOCarsObject.CarsObject;
    isNew: KnockoutObservable<boolean>;
    activate(Id: any, query: any): void;
    canDeactivate(): boolean;
    private loadData();
    onSave(): void;
    onDelete(): void;
    onClose(): void;
    private onSaved();
}
export = CarsObjectView;
