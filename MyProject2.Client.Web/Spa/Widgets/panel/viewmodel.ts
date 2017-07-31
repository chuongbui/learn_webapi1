import utils = require('Spa/utils');

class PanelWidget {

    public expanded: KnockoutObservable<boolean>;
    public settings: any;

    constructor() {
    }

    public activate(settings) {
        this.settings = settings;
        this.expanded = utils.Ko.observable(this.settings.expanded, true);
    }
}

export = PanelWidget;
