"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAction = void 0;
const chalk = require("chalk");
const get_value_or_default_1 = require("../lib/compiler/helpers/get-value-or-default");
const schematics_1 = require("../lib/schematics");
const ui_1 = require("../lib/ui");
const load_configuration_1 = require("../lib/utils/load-configuration");
const project_utils_1 = require("../lib/utils/project-utils");
const abstract_action_1 = require("./abstract.action");
class GenerateAction extends abstract_action_1.AbstractAction {
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield generateFiles(inputs.concat(options));
        });
    }
}
exports.GenerateAction = GenerateAction;
const generateFiles = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const configuration = yield (0, load_configuration_1.loadConfiguration)();
    const collectionOption = inputs.find((option) => option.name === 'collection').value;
    const schematic = inputs.find((option) => option.name === 'schematic')
        .value;
    const appName = inputs.find((option) => option.name === 'project')
        .value;
    const spec = inputs.find((option) => option.name === 'spec');
    const flat = inputs.find((option) => option.name === 'flat');
    const collection = schematics_1.CollectionFactory.create(collectionOption || configuration.collection || schematics_1.Collection.NESTJS);
    const schematicOptions = mapSchematicOptions(inputs);
    schematicOptions.push(new schematics_1.SchematicOption('language', configuration.language));
    const configurationProjects = configuration.projects;
    let sourceRoot = appName
        ? (0, get_value_or_default_1.getValueOrDefault)(configuration, 'sourceRoot', appName)
        : configuration.sourceRoot;
    const specValue = spec.value;
    const flatValue = !!flat;
    const specOptions = spec.options;
    let generateSpec = (0, project_utils_1.shouldGenerateSpec)(configuration, schematic, appName, specValue, specOptions.passedAsInput);
    let generateFlat = (0, project_utils_1.shouldGenerateFlat)(configuration, appName, flatValue);
    // If you only add a `lib` we actually don't have monorepo: true BUT we do have "projects"
    // Ensure we don't run for new app/libs schematics
    if ((0, project_utils_1.shouldAskForProject)(schematic, configurationProjects, appName)) {
        const defaultLabel = ' [ Default ]';
        let defaultProjectName = configuration.sourceRoot + defaultLabel;
        for (const property in configurationProjects) {
            if (configurationProjects[property].sourceRoot === configuration.sourceRoot) {
                defaultProjectName = property + defaultLabel;
                break;
            }
        }
        const projects = (0, project_utils_1.moveDefaultProjectToStart)(configuration, defaultProjectName, defaultLabel);
        const answers = yield (0, project_utils_1.askForProjectName)(ui_1.MESSAGES.PROJECT_SELECTION_QUESTION, projects);
        const project = answers.appName.replace(defaultLabel, '');
        if (project !== configuration.sourceRoot) {
            sourceRoot = configurationProjects[project].sourceRoot;
        }
        if (answers.appName !== defaultProjectName) {
            // Only overwrite if the appName is not the default- as it has already been loaded above
            generateSpec = (0, project_utils_1.shouldGenerateSpec)(configuration, schematic, answers.appName, specValue, specOptions.passedAsInput);
            generateFlat = (0, project_utils_1.shouldGenerateFlat)(configuration, answers.appNames, flatValue);
        }
    }
    schematicOptions.push(new schematics_1.SchematicOption('sourceRoot', sourceRoot));
    schematicOptions.push(new schematics_1.SchematicOption('spec', generateSpec));
    schematicOptions.push(new schematics_1.SchematicOption('flat', generateFlat));
    try {
        const schematicInput = inputs.find((input) => input.name === 'schematic');
        if (!schematicInput) {
            throw new Error('Unable to find a schematic for this configuration');
        }
        yield collection.execute(schematicInput.value, schematicOptions);
    }
    catch (error) {
        if (error && error.message) {
            console.error(chalk.red(error.message));
        }
    }
});
const mapSchematicOptions = (inputs) => {
    const excludedInputNames = ['schematic', 'spec', 'flat'];
    const options = [];
    inputs.forEach((input) => {
        if (!excludedInputNames.includes(input.name) && input.value !== undefined) {
            options.push(new schematics_1.SchematicOption(input.name, input.value));
        }
    });
    return options;
};
