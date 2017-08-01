import xomega = require("xomega");
export declare module Xomega {
    function configure(): void;
}
export declare module Routing {
    function findRootRoute(route: string): DurandalRouteConfiguration;
    function findParent(child: any): any;
}
export declare module Layout {
    function init(): void;
    function fitForm($form: JQuery): void;
}
export declare module UI {
    function appliedCriteriaTooltip(ac: Array<xomega.FieldCriteria>): string;
}
export declare module Ko {
    function observable(val: any, def: any): KnockoutObservable<any>;
}
