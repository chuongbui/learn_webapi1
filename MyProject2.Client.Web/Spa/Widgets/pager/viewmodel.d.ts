declare class PagerWidget {
    pageSizes: number[];
    pageSize: KnockoutObservable<number>;
    maxPage: KnockoutComputed<number>;
    curPage: KnockoutObservable<number>;
    pageFrom: KnockoutComputed<number>;
    pageTo: KnockoutComputed<number>;
    pagedItems: KnockoutComputed<any[]>;
    settings: any;
    constructor();
    activate(settings: any): void;
}
export = PagerWidget;
