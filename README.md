# o-assets [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This component provides Sass and JavaScript utilities for reliably building paths to a component's static assets, such as CSS background images, fonts and JSON data files. This is needed because the URL path to load these assets will vary depending on how a product developer chooses to integrate the Origami component into their website.

- [Overview](#overview)
- [Sass](#sass)
- [JavaScript](#javascript)
- [URL routing](#url-routing)
	- [Using with the build service](#using-with-the-build-service)
- [Contact](#contact)
- [Licence](#licence)

## Overview

If a component called `o-example` contains a stylesheet that loads a logo as a background, and that image exists at `/img/logo.png` in the component's git repository, the path that needs to be output in the CSS could vary:

1. `https://origami-build.ft.com/v2/files/o-example@1.2/img/logo.png` - If the product developer uses the build service to fetch the CSS, it needs to send the request for the logo back through the build service, and also needs to know what version of the component the CSS came from so it can serve the logo image from the same version.
1. `/bower_components/o-example/logo.png` - If the product developer has installed the Origami components in a `bower_components` directory (which is typical) and that directory is at the root of their web server's public document tree, the default variable values will make the subresources Just Work&trade;
1. `/resources/head/logo.png` - If the product developer has a front-controller and can therefore internally map resource request URLs to different paths on the filesystem, and perhaps also wants to rename the component name component to something of their choosing, they might want the path to be something like this.

When loading from installed components there is no need for a version number because the subresource file will be part of the same installed package from which the CSS or JavaScript is drawn.

Where you need to resolve a path use the `resolve` methods, which take the path relative to the component root directory and component name as arguments:

## Sass

```scss
background: url(oAssetsResolve("img/symbols-sprite.png", o-weather));
```

## JavaScript

```js
import {resolve} from 'o-assets'
xhr.open('get', resolve('data/2013/12/monthdata.csv', 'o-weather'))
```

## URL routing

'URL routing' is used as a generic term for any method used to point a url to a resource, including copying the resource to the location specified by the url.

### If you don't have URL routing

If your web server is serving files directly from disk with no routing layer, and therefore URL paths map directly to filesystem paths, then Origami assets should load correctly by default, provided that you:

- installed your Origami components using bower in the default `bower_components` directory; and
- your `bower_components` directory is _inside_ and at the base of the public web server document root of your project.

### If you do have URL routing

If you have URL routing and you want to improve on the above (because it's generally inadvisable to put bower_components in a public area of your web server), you can configure the assets component to load assets from a different path. The path to a given resource is composed by doing the following concatenation by default:

```scss
$o-assets-global-path + {component-name} + / + {path-within-repo}
```

By default the global path is `/bower_components/`, which anticipates that you will put your local bower components directory in the public web root of your web server. However, as well as editing this, you can also set a custom path to any component, in whcih case the path for that component becomes:

```scss
{custom-path} + {path-within-repo}
```

Note that when you set a custom path for a component, the global path prefix is not used (but is still used for any components for which you have not set a custom path).

Any custom configuration should be set before including any other components in your product's sass/js bundles.

1. Global path prefix: `$o-assets-global-path` variable (in Sass) and `setGlobalPathPrefix` method (in JavaScript). Default is '/bower_components/'.
1. component path: This defaults to the name of the component and is set using methods that accept a map of component names and paths:

#### Sass

```scss
@include oAssetsSetModulePaths((
	'o-example': '/assets/example'
));
```

#### JavaScript

```js
import { setModulePaths } from 'o-assets';
setModulePaths({
	'o-example': '/assets/example'
});
```

### Using with the build service

If you don't want to make local static assets available publicly, but you want to benefit from including Origami component CSS and JS into your own build, you can use the build service for your local assets. To do this, you will need to configure paths that _include the version of the component that you installed_, because otherwise the build service might give you assets from a different version of the component to the one you have. This is a significant gotcha, especially if you have non-shrinkwrapped Origami dependencies. Make sure your asset resource paths match the version you _actually installed_.

```js
import {setModulePaths} from 'o-assets'
setModulePaths({
	'o-example': '//origami-build.ft.com/v2/files/o-example@1.2.3',
	'o-grid': '//origami-build.ft.com/v2/files/o-grid@2.3.4',
})
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-assets/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
