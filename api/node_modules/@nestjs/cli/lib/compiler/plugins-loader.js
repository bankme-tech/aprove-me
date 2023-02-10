"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginsLoader = void 0;
const path_1 = require("path");
const util_1 = require("util");
const ui_1 = require("../ui");
const PLUGIN_ENTRY_FILENAME = 'plugin';
class PluginsLoader {
    load(plugins = []) {
        const pluginNames = plugins.map((entry) => (0, util_1.isObject)(entry) ? entry.name : entry);
        const nodeModulePaths = [
            (0, path_1.join)(process.cwd(), 'node_modules'),
            ...module.paths,
        ];
        const pluginRefs = pluginNames.map((item) => {
            try {
                try {
                    const binaryPath = require.resolve((0, path_1.join)(item, PLUGIN_ENTRY_FILENAME), {
                        paths: nodeModulePaths,
                    });
                    return require(binaryPath);
                }
                catch (_a) { }
                const binaryPath = require.resolve(item, { paths: nodeModulePaths });
                return require(binaryPath);
            }
            catch (e) {
                throw new Error(`"${item}" plugin could not be found!`);
            }
        });
        const beforeHooks = [];
        const afterHooks = [];
        const afterDeclarationsHooks = [];
        pluginRefs.forEach((plugin, index) => {
            if (!plugin.before && !plugin.after && !plugin.afterDeclarations) {
                throw new Error(ui_1.CLI_ERRORS.WRONG_PLUGIN(pluginNames[index]));
            }
            const options = (0, util_1.isObject)(plugins[index])
                ? plugins[index].options || {}
                : {};
            plugin.before &&
                beforeHooks.push(plugin.before.bind(plugin.before, options));
            plugin.after && afterHooks.push(plugin.after.bind(plugin.after, options));
            plugin.afterDeclarations &&
                afterDeclarationsHooks.push(plugin.afterDeclarations.bind(plugin.afterDeclarations, options));
        });
        return {
            beforeHooks,
            afterHooks,
            afterDeclarationsHooks,
        };
    }
}
exports.PluginsLoader = PluginsLoader;
