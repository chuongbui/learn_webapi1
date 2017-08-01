import _DOCarsCriteria = require("Spa/DataObjects/_DOCarsCriteria");
import _DOCarsList = require("Spa/DataObjects/_DOCarsList");
declare class CarsListView {
    router: DurandalRouter;
    criteriaExpanded: KnockoutObservable<boolean>;
    Criteria: _DOCarsCriteria.CarsCriteria;
    Results: _DOCarsList.CarsList;
    appliedCriteriaTooltip: KnockoutComputed<any>;
    private query;
    constructor();
    activate(route: any, query: any): void;
    private run(query);
    reset(full?: boolean): void;
    search(auto?: boolean): void;
    permalink(): void;
    onChildDetailsSave(): void;
}
export = CarsListView;
