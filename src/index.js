"use strict";
require('./polyfills');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const core_1 = require('@angular/core');
const environment_prod_1 = require('./environment.prod');
const app_module_1 = require('./app.module');
if (environment_prod_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
