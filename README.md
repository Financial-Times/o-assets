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
* If your product bundles up the modules' assets into a single directory (no subdirectory for each module), for each module set `$o-module-name-assets-path: #{''}` *\[Note: this isn't an advisable pattern as future module versions may contain assets whose names clash with other modules, or bring in subdependencies with paths you haven't overrridden\]*
* Use cases for `$o-module-name-version` are generally limited to products using the [build service](http://financial-times.github.io/ft-origami/docs/build-service/), and manually modifying this variable is unlikely to be needed.

##javascript

*undeveloped*

##Rationale

This policy is designed to enable product developers to easily use the build service, which will define `current-version` variables for each module in the bundle, and will set the global prefix to its own hostname.   This will mean that in the case of the example above, assuming version 1.2 of the colors module, the subresource would be requested from:

	http://buildservice.ft.com/files/o-colors/1.2/img/logo.png

This allows the build service to fully resolve the exact version of the right file, and serve it.  Equally, product developers may leave the prefix and version variables unchanged, in which case the default behaviour will request the resources from:

	/bower_components/o-colors/img/logo.png

If the product developer has installed the Origami modules in a `bower_components` directory (which is typical) and that directory is at the root of their web server's public document tree, the default variable values will make the subresources Just Work&trade;.  However, it's usually advisable not to install packages inside your web root, so the product developer is expected to want to redefine `$o-assets-global-path` and implement a route for this within their front controller, mapping it to the location of their bower_components directory in their file tree.

When loading from installed modules there is no need for a version number because the subresource file will be part of the same installed package from which the CSS is drawn.