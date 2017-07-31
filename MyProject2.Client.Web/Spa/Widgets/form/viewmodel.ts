import $ = require('jquery');
import router = require('plugins/router');
import utils = require('Spa/utils');

class FormWidget {

    public dialog: boolean;
    public settings: any;

    constructor() {
    }

    public activate(settings) {
        this.settings = settings;
        // Note: Only show as dialog if there is a parent context additionally to the flag.
        this.dialog = this.isDialog() && utils.Routing.findParent(settings.bindingContext.$root);
    }

    public attached() {
        if (this.isFitted()) {
            $(this.settings.child).addClass('fit');
            utils.Layout.fitForm($(this.settings.child));
        }
        if (this.dialog) {
            $(this.settings.child).addClass('dialog');
            $('.overlay').fadeTo(200, 0.3);
        }
    }

    public detached() {
        // Note: Durandal can detach parent first, making dynamic 
        // verification of the dialog flag impossible at this point.
        if (this.dialog) {
            $('.overlay').fadeOut(100);
        }
    }

    public close() {
        var host = this.settings.bindingContext.$root;
        if (typeof host.onClose == 'function')
            host.onClose();
        else {
            router.navigateBack();
        }
    }

    private isFitted(): boolean {
        return typeof this.settings.fit == 'boolean' && this.settings.fit;
    }
    private isDialog(): boolean {
        return typeof this.settings.dialog == 'boolean' && this.settings.dialog;
    }
}

export = FormWidget;
