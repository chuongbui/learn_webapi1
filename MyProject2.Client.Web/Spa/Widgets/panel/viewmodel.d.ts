declare class PanelWidget {
    expanded: KnockoutObservable<boolean>;
    settings: any;
    constructor();
    activate(settings: any): void;
}
export = PanelWidget;
