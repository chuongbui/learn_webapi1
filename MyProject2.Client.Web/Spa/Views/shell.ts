import routeCfg = require('Spa/routes');
import utils = require('Spa/utils');

class Shell {

    public app: any = require('durandal/app');
    public router: any = require('plugins/router');

    public activate() {

        utils.Xomega.configure();
        utils.Layout.init();

        // activate router
        return this.router
            .map(routeCfg.Routes)
            .buildNavigationModel()
            .activate();
    }
}

export = Shell;
