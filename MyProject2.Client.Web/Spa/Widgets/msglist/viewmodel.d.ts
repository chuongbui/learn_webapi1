declare class MessageListWidget {
    settings: any;
    constructor();
    activate(settings: any): void;
    iconClass(severity: any): string;
}
export = MessageListWidget;
