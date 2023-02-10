"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsconfigPathsBeforeHookFactory = void 0;
const os = require("os");
const path_1 = require("path");
const typescript_loader_1 = require("../typescript-loader");
const tsPaths = require("tsconfig-paths");
function tsconfigPathsBeforeHookFactory(compilerOptions) {
    var _a;
    const tsBinary = new typescript_loader_1.TypeScriptBinaryLoader().load();
    const [tsVersionMajor, tsVersionMinor] = (_a = tsBinary.versionMajorMinor) === null || _a === void 0 ? void 0 : _a.split('.').map((x) => +x);
    const isInUpdatedAstContext = tsVersionMinor >= 8 || tsVersionMajor > 4;
    const { paths = {}, baseUrl = './' } = compilerOptions;
    const matcher = tsPaths.createMatchPath(baseUrl, paths, ['main']);
    return (ctx) => {
        return (sf) => {
            const visitNode = (node) => {
                if (tsBinary.isImportDeclaration(node) ||
                    (tsBinary.isExportDeclaration(node) && node.moduleSpecifier)) {
                    try {
                        const importPathWithQuotes = node.moduleSpecifier && node.moduleSpecifier.getText();
                        if (!importPathWithQuotes) {
                            return node;
                        }
                        const text = importPathWithQuotes.substring(1, importPathWithQuotes.length - 1);
                        const result = getNotAliasedPath(sf, matcher, text);
                        if (!result) {
                            return node;
                        }
                        const moduleSpecifier = tsBinary.factory.createStringLiteral(result);
                        moduleSpecifier.parent = node.moduleSpecifier.parent;
                        if (tsBinary.isImportDeclaration(node)) {
                            const updatedNode = isInUpdatedAstContext
                                ? tsBinary.factory.updateImportDeclaration(node, node.modifiers, node.importClause, moduleSpecifier, node.assertClause)
                                : tsBinary.factory.updateImportDeclaration(node, node.decorators, node.modifiers, node.importClause, moduleSpecifier, node.assertClause);
                            updatedNode.flags = node.flags;
                            return updatedNode;
                        }
                        else {
                            const updatedNode = isInUpdatedAstContext
                                ? tsBinary.factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, node.exportClause, moduleSpecifier, node.assertClause)
                                : tsBinary.factory.updateExportDeclaration(node, node.decorators, node.modifiers, node.isTypeOnly, node.exportClause, moduleSpecifier, node.assertClause);
                            updatedNode.flags = node.flags;
                            return updatedNode;
                        }
                    }
                    catch (_a) {
                        return node;
                    }
                }
                return tsBinary.visitEachChild(node, visitNode, ctx);
            };
            return tsBinary.visitNode(sf, visitNode);
        };
    };
}
exports.tsconfigPathsBeforeHookFactory = tsconfigPathsBeforeHookFactory;
function getNotAliasedPath(sf, matcher, text) {
    let result = matcher(text, undefined, undefined, [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
    ]);
    if (!result) {
        return;
    }
    if (os.platform() === 'win32') {
        result = result.replace(/\\/g, '/');
    }
    try {
        // Installed packages (node modules) should take precedence over root files with the same name.
        // Ref: https://github.com/nestjs/nest-cli/issues/838
        const packagePath = require.resolve(text, {
            paths: [process.cwd(), ...module.paths],
        });
        if (packagePath) {
            return text;
        }
    }
    catch (_a) { }
    const resolvedPath = path_1.posix.relative((0, path_1.dirname)(sf.fileName), result) || './';
    return resolvedPath[0] === '.' ? resolvedPath : './' + resolvedPath;
}
