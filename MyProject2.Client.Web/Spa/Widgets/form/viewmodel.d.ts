declare class FormWidget {
    dialog: boolean;
    settings: any;
    constructor();
    activate(settings: any): void;
    attached(): void;
    detached(): void;
    close(): void;
    private isFitted();
    private isDialog();
}
export = FormWidget;
