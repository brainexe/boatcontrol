#!/usr/bin/env node

const plugins = require('./lib/plugins');

plugins.loadAll().then(() => {
    const control = require('./lib/control');
    console.log("[Plugins] Loaded!".green);
    control.loadAll();
    console.log("[Boat] Started!".green);
});
