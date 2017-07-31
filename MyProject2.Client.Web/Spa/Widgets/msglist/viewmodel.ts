class MessageListWidget {

    public settings: any;

    constructor() {
    }

    public activate(settings) {
        this.settings = settings;
    }

    public iconClass(severity): string {
        return severity == 1 ? 'fa-times-circle' : severity == 2 ? 'fa-exclamation-circle' : 'fa-info-circle';
    }
}

export = MessageListWidget;
