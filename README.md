#assets module

This module provides sass and javascript utilities for reliably building paths to a module's static assets

##sass

### Module developers

Within your module you will need to define the following variables *exactly* as follows (replacing `module-name` with the name of your module)

	$o-module-name-version: null !default;
	$o-module-name-assets-path: module-name !default;

To reference a static asset from within your stylesheet you should use the `oAssetsUse` function as follows

	background: url(oAssetsUse("img/logo.png", $o-module-name-assets-path, $o-module-name-version));

####Local shorthand
A recommended pattern is to define a shorthand function for the above in your own module

    @function oModuleNameAsset ($asset) {
        @return oAssetsUse($asset, $o-module-name-assets-path, $o-module-name-version)
    }
	...
	background: url(oModuleNameAsset("img/logo2.png"));

###Product developers
With your origami components installed using bower in the default `bower_components` directory, and your web page in the root directory of the project your built sass stylesheets should point to the correct paths to reference the assets within each origami component's subdirectory, e.g. `background: url(/bower_components/module-name/img/logo2.png);`. The paths can however be configured to suit your product as follows:

* If your assets are available from a different directory (though still in subdirectories named after the module) simply set `$o-assets-global-path: '/whichever/path/you/need'`, and it will be prepended instead of `/bower_components`;
* If your product bundles up the modules' assets into a single directory (no subdirectory for each module), for each module set `$o-module-name-assets-path: null` *\[Note: this isn't an advisable pattern as future module versions may contain assets whose names clash with other modules, or bring in subdependencies with paths you haven't overrridden\]*
* Use cases for `$o-module-name-version` are generally limited to products using the [build service](http://financial-times.github.io/ft-origami/docs/build-service/), and manually modifying this variable is unlikely to be needed.

##javascript

*undeveloped*