"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownPackageManagerException = void 0;
const core_1 = require("@angular-devkit/core");
const child_process_1 = require("child_process");
const ora_1 = __importDefault(require("ora"));
const path = __importStar(require("path"));
const rxjs_1 = require("rxjs");
const src_1 = require("../../src");
const packageManagers = {
    'npm': {
        commands: {
            installAll: 'install',
            installPackage: 'install',
        },
    },
    'cnpm': {
        commands: {
            installAll: 'install',
            installPackage: 'install',
        },
    },
    'yarn': {
        commands: {
            installPackage: 'add',
        },
    },
    'pnpm': {
        commands: {
            installAll: 'install',
            installPackage: 'install',
        },
    },
};
class UnknownPackageManagerException extends core_1.BaseException {
    constructor(name) {
        super(`Unknown package manager "${name}".`);
    }
}
exports.UnknownPackageManagerException = UnknownPackageManagerException;
function default_1(factoryOptions = {}) {
    const packageManagerName = factoryOptions.packageManager || 'npm';
    const packageManagerProfile = packageManagers[packageManagerName];
    if (!packageManagerProfile) {
        throw new UnknownPackageManagerException(packageManagerName);
    }
    const rootDirectory = factoryOptions.rootDirectory || process.cwd();
    return (options = { command: 'install' }) => {
        let taskPackageManagerProfile = packageManagerProfile;
        let taskPackageManagerName = packageManagerName;
        if (factoryOptions.allowPackageManagerOverride && options.packageManager) {
            taskPackageManagerProfile = packageManagers[options.packageManager];
            if (!taskPackageManagerProfile) {
                throw new UnknownPackageManagerException(options.packageManager);
            }
            taskPackageManagerName = options.packageManager;
        }
        const bufferedOutput = [];
        const spawnOptions = {
            shell: true,
            cwd: path.join(rootDirectory, options.workingDirectory || ''),
        };
        if (options.hideOutput) {
            spawnOptions.stdio = options.quiet ? ['ignore', 'ignore', 'pipe'] : 'pipe';
        }
        else {
            spawnOptions.stdio = options.quiet ? ['ignore', 'ignore', 'inherit'] : 'inherit';
        }
        const args = [];
        if (options.packageName) {
            if (options.command === 'install') {
                args.push(taskPackageManagerProfile.commands.installPackage);
            }
            args.push(options.packageName);
        }
        else if (options.command === 'install' && taskPackageManagerProfile.commands.installAll) {
            args.push(taskPackageManagerProfile.commands.installAll);
        }
        if (!options.allowScripts) {
            // Yarn requires special handling since Yarn 2+ no longer has the `--ignore-scripts` flag
            if (taskPackageManagerName === 'yarn') {
                spawnOptions.env = {
                    ...process.env,
                    // Supported with yarn 1
                    'npm_config_ignore_scripts': 'true',
                    // Supported with yarn 2+
                    'YARN_ENABLE_SCRIPTS': 'false',
                };
            }
            else {
                args.push('--ignore-scripts');
            }
        }
        if (factoryOptions.registry) {
            args.push(`--registry="${factoryOptions.registry}"`);
        }
        if (factoryOptions.force) {
            args.push('--force');
        }
        return new rxjs_1.Observable((obs) => {
            var _a, _b;
            const spinner = (0, ora_1.default)({
                text: `Installing packages (${taskPackageManagerName})...`,
                // Workaround for https://github.com/sindresorhus/ora/issues/136.
                discardStdin: process.platform != 'win32',
            }).start();
            const childProcess = (0, child_process_1.spawn)(taskPackageManagerName, args, spawnOptions).on('close', (code) => {
                if (code === 0) {
                    spinner.succeed('Packages installed successfully.');
                    spinner.stop();
                    obs.next();
                    obs.complete();
                }
                else {
                    if (options.hideOutput) {
                        bufferedOutput.forEach(({ stream, data }) => stream.write(data));
                    }
                    spinner.fail('Package install failed, see above.');
                    obs.error(new src_1.UnsuccessfulWorkflowExecution());
                }
            });
            if (options.hideOutput) {
                (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => bufferedOutput.push({ stream: process.stdout, data: data }));
                (_b = childProcess.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => bufferedOutput.push({ stream: process.stderr, data: data }));
            }
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3Rhc2tzL3BhY2thZ2UtbWFuYWdlci9leGVjdXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILCtDQUFxRDtBQUNyRCxpREFBb0Q7QUFDcEQsOENBQXNCO0FBQ3RCLDJDQUE2QjtBQUM3QiwrQkFBa0M7QUFDbEMsbUNBQXdFO0FBVXhFLE1BQU0sZUFBZSxHQUE4QztJQUNqRSxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUU7WUFDUixVQUFVLEVBQUUsU0FBUztZQUNyQixjQUFjLEVBQUUsU0FBUztTQUMxQjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsVUFBVSxFQUFFLFNBQVM7WUFDckIsY0FBYyxFQUFFLFNBQVM7U0FDMUI7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRTtZQUNSLGNBQWMsRUFBRSxLQUFLO1NBQ3RCO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUU7WUFDUixVQUFVLEVBQUUsU0FBUztZQUNyQixjQUFjLEVBQUUsU0FBUztTQUMxQjtLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQWEsOEJBQStCLFNBQVEsb0JBQWE7SUFDL0QsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyw0QkFBNEIsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUFKRCx3RUFJQztBQUVELG1CQUNFLGlCQUFnRCxFQUFFO0lBRWxELE1BQU0sa0JBQWtCLEdBQUcsY0FBYyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUM7SUFDbEUsTUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsRSxJQUFJLENBQUMscUJB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QUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUM1RCxDQUFDO2dCQUNGLE1BQUEsWUFBWSxDQUFDLE1BQU0sMENBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQy9DLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDNUQsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBcEdELDRCQW9HQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgU3Bhd25PcHRpb25zLCBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IG9yYSBmcm9tICdvcmEnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhc2tFeGVjdXRvciwgVW5zdWNjZXNzZnVsV29ya2Zsb3dFeGVjdXRpb24gfSBmcm9tICcuLi8uLi9zcmMnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VUYXNrRmFjdG9yeU9wdGlvbnMsIE5vZGVQYWNrYWdlVGFza09wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuXG5pbnRlcmZhY2UgUGFja2FnZU1hbmFnZXJQcm9maWxlIHtcbiAgY29tbWFuZHM6IHtcbiAgICBpbnN0YWxsQWxsPzogc3RyaW5nO1xuICAgIGluc3RhbGxQYWNrYWdlOiBzdHJpbmc7XG4gIH07XG59XG5cbmNvbnN0IHBhY2thZ2VNYW5hZ2VyczogeyBbbmFtZTogc3RyaW5nXTogUGFja2FnZU1hbmFnZXJQcm9maWxlIH0gPSB7XG4gICducG0nOiB7XG4gICAgY29tbWFuZHM6IHtcbiAgICAgIGluc3RhbGxBbGw6ICdpbnN0YWxsJyxcbiAgICAgIGluc3RhbGxQYWNrYWdlOiAnaW5zdGFsbCcsXG4gICAgfSxcbiAgfSxcbiAgJ2NucG0nOiB7XG4gICAgY29tbWFuZHM6IHtcbiAgICAgIGluc3RhbGxBbGw6ICdpbnN0YWxsJyxcbiAgICAgIGluc3RhbGxQYWNrYWdlOiAnaW5zdGFsbCcsXG4gICAgfSxcbiAgfSxcbiAgJ3lhcm4nOiB7XG4gICAgY29tbWFuZHM6IHtcbiAgICAgIGluc3RhbGxQYWNrYWdlOiAnYWRkJyxcbiAgICB9LFxuICB9LFxuICAncG5wbSc6IHtcbiAgICBjb21tYW5kczoge1xuICAgICAgaW5zdGFsbEFsbDogJ2luc3RhbGwnLFxuICAgICAgaW5zdGFsbFBhY2thZ2U6ICdpbnN0YWxsJyxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGNsYXNzIFVua25vd25QYWNrYWdlTWFuYWdlckV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgVW5rbm93biBwYWNrYWdlIG1hbmFnZXIgXCIke25hbWV9XCIuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKFxuICBmYWN0b3J5T3B0aW9uczogTm9kZVBhY2thZ2VUYXNrRmFjdG9yeU9wdGlvbnMgPSB7fSxcbik6IFRhc2tFeGVjdXRvcjxOb2RlUGFja2FnZVRhc2tPcHRpb25zPiB7XG4gIGNvbnN0IHBhY2thZ2VNYW5hZ2VyTmFtZSA9IGZhY3RvcnlPcHRpb25zLnBhY2thZ2VNYW5hZ2VyIHx8ICducG0nO1xuICBjb25zdCBwYWNrYWdlTWFuYWdlclByb2ZpbGUgPSBwYWNrYWdlTWFuYWdlcnNbcGFja2FnZU1hbmFnZXJOYW1lXTtcbiAgaWYgKCFwYWNrYWdlTWFuYWdlclByb2ZpbGUpIHtcbiAgICB0aHJvdyBuZXcgVW5rbm93blBhY2thZ2VNYW5hZ2VyRXhjZXB0aW9uKHBhY2thZ2VNYW5hZ2VyTmFtZSk7XG4gIH1cblxuICBjb25zdCByb290RGlyZWN0b3J5ID0gZmFjdG9yeU9wdGlvbnMucm9vdERpcmVjdG9yeSB8fCBwcm9jZXNzLmN3ZCgpO1xuXG4gIHJldHVybiAob3B0aW9uczogTm9kZVBhY2thZ2VUYXNrT3B0aW9ucyA9IHsgY29tbWFuZDogJ2luc3RhbGwnIH0pID0+IHtcbiAgICBsZXQgdGFza1BhY2thZ2VNYW5hZ2VyUHJvZmlsZSA9IHBhY2thZ2VNYW5hZ2VyUHJvZmlsZTtcbiAgICBsZXQgdGFza1BhY2thZ2VNYW5hZ2VyTmFtZSA9IHBhY2thZ2VNYW5hZ2VyTmFtZTtcbiAgICBpZiAoZmFjdG9yeU9wdGlvbnMuYWxsb3dQYWNrYWdlTWFuYWdlck92ZXJyaWRlICYmIG9wdGlvbnMucGFja2FnZU1hbmFnZXIpIHtcbiAgICAgIHRhc2tQYWNrYWdlTWFuYWdlclByb2ZpbGUgPSBwYWNrYWdlTWFuYWdlcnNbb3B0aW9ucy5wYWNrYWdlTWFuYWdlcl07XG4gICAgICBpZiAoIXRhc2tQYWNrYWdlTWFuYWdlclByb2ZpbGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVua25vd25QYWNrYWdlTWFuYWdlckV4Y2VwdGlvbihvcHRpb25zLnBhY2thZ2VNYW5hZ2VyKTtcbiAgICAgIH1cbiAgICAgIHRhc2tQYWNrYWdlTWFuYWdlck5hbWUgPSBvcHRpb25zLnBhY2thZ2VNYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZmZlcmVkT3V0cHV0OiB7IHN0cmVhbTogTm9kZUpTLldyaXRlU3RyZWFtOyBkYXRhOiBCdWZmZXIgfVtdID0gW107XG4gICAgY29uc3Qgc3Bhd25PcHRpb25zOiBTcGF3bk9wdGlvbnMgPSB7XG4gICAgICBzaGVsbDogdHJ1ZSxcbiAgICAgIGN3ZDogcGF0aC5qb2luKHJvb3REaXJlY3RvcnksIG9wdGlvbnMud29ya2luZ0RpcmVjdG9yeSB8fCAnJyksXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucy5oaWRlT3V0cHV0KSB7XG4gICAgICBzcGF3bk9wdGlvbnMuc3RkaW8gPSBvcHRpb25zLnF1aWV0ID8gWydpZ25vcmUnLCAnaWdub3JlJywgJ3BpcGUnXSA6ICdwaXBlJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3Bhd25PcHRpb25zLnN0ZGlvID0gb3B0aW9ucy5xdWlldCA/IFsnaWdub3JlJywgJ2lnbm9yZScsICdpbmhlcml0J10gOiAnaW5oZXJpdCc7XG4gICAgfVxuXG4gICAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChvcHRpb25zLnBhY2thZ2VOYW1lKSB7XG4gICAgICBpZiAob3B0aW9ucy5jb21tYW5kID09PSAnaW5zdGFsbCcpIHtcbiAgICAgICAgYXJncy5wdXNoKHRhc2tQYWNrYWdlTWFuYWdlclByb2ZpbGUuY29tbWFuZHMuaW5zdGFsbFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXJncy5wdXNoKG9wdGlvbnMucGFja2FnZU5hbWUpO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5jb21tYW5kID09PSAnaW5zdGFsbCcgJiYgdGFza1BhY2thZ2VNYW5hZ2VyUHJvZmlsZS5jb21tYW5kcy5pbnN0YWxsQWxsKSB7XG4gICAgICBhcmdzLnB1c2godGFza1BhY2thZ2VNYW5hZ2VyUHJvZmlsZS5jb21tYW5kcy5pbnN0YWxsQWxsKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuYWxsb3dTY3JpcHRzKSB7XG4gICAgICAvLyBZYXJuIHJlcXVpcmVzIHNwZWNpYWwgaGFuZGxpbmcgc2luY2UgWWFybiAyKyBubyBsb25nZXIgaGFzIHRoZSBgLS1pZ25vcmUtc2NyaXB0c2AgZmxhZ1xuICAgICAgaWYgKHRhc2tQYWNrYWdlTWFuYWdlck5hbWUgPT09ICd5YXJuJykge1xuICAgICAgICBzcGF3bk9wdGlvbnMuZW52ID0ge1xuICAgICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICAgIC8vIFN1cHBvcnRlZCB3aXRoIHlhcm4gMVxuICAgICAgICAgICducG1fY29uZmlnX2lnbm9yZV9zY3JpcHRzJzogJ3RydWUnLFxuICAgICAgICAgIC8vIFN1cHBvcnRlZCB3aXRoIHlhcm4gMitcbiAgICAgICAgICAnWUFSTl9FTkFCTEVfU0NSSVBUUyc6ICdmYWxzZScsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzLnB1c2goJy0taWdub3JlLXNjcmlwdHMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmFjdG9yeU9wdGlvbnMucmVnaXN0cnkpIHtcbiAgICAgIGFyZ3MucHVzaChgLS1yZWdpc3RyeT1cIiR7ZmFjdG9yeU9wdGlvbnMucmVnaXN0cnl9XCJgKTtcbiAgICB9XG5cbiAgICBpZiAoZmFjdG9yeU9wdGlvbnMuZm9yY2UpIHtcbiAgICAgIGFyZ3MucHVzaCgnLS1mb3JjZScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzKSA9PiB7XG4gICAgICBjb25zdCBzcGlubmVyID0gb3JhKHtcbiAgICAgICAgdGV4dDogYEluc3RhbGxpbmcgcGFja2FnZXMgKCR7dGFza1BhY2thZ2VNYW5hZ2VyTmFtZX0pLi4uYCxcbiAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9vcmEvaXNzdWVzLzEzNi5cbiAgICAgICAgZGlzY2FyZFN0ZGluOiBwcm9jZXNzLnBsYXRmb3JtICE9ICd3aW4zMicsXG4gICAgICB9KS5zdGFydCgpO1xuICAgICAgY29uc3QgY2hpbGRQcm9jZXNzID0gc3Bhd24odGFza1BhY2thZ2VNYW5hZ2VyTmFtZSwgYXJncywgc3Bhd25PcHRpb25zKS5vbihcbiAgICAgICAgJ2Nsb3NlJyxcbiAgICAgICAgKGNvZGU6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGlmIChjb2RlID09PSAwKSB7XG4gICAgICAgICAgICBzcGlubmVyLnN1Y2NlZWQoJ1BhY2thZ2VzIGluc3RhbGxlZCBzdWNjZXNzZnVsbHkuJyk7XG4gICAgICAgICAgICBzcGlubmVyLnN0b3AoKTtcbiAgICAgICAgICAgIG9icy5uZXh0KCk7XG4gICAgICAgICAgICBvYnMuY29tcGxldGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGlkZU91dHB1dCkge1xuICAgICAgICAgICAgICBidWZmZXJlZE91dHB1dC5mb3JFYWNoKCh7IHN0cmVhbSwgZGF0YSB9KSA9PiBzdHJlYW0ud3JpdGUoZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Bpbm5lci5mYWlsKCdQYWNrYWdlIGluc3RhbGwgZmFpbGVkLCBzZWUgYWJvdmUuJyk7XG4gICAgICAgICAgICBvYnMuZXJyb3IobmV3IFVuc3VjY2Vzc2Z1bFdvcmtmbG93RXhlY3V0aW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBpZiAob3B0aW9ucy5oaWRlT3V0cHV0KSB7XG4gICAgICAgIGNoaWxkUHJvY2Vzcy5zdGRvdXQ/Lm9uKCdkYXRhJywgKGRhdGE6IEJ1ZmZlcikgPT5cbiAgICAgICAgICBidWZmZXJlZE91dHB1dC5wdXNoKHsgc3RyZWFtOiBwcm9jZXNzLnN0ZG91dCwgZGF0YTogZGF0YSB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgY2hpbGRQcm9jZXNzLnN0ZGVycj8ub24oJ2RhdGEnLCAoZGF0YTogQnVmZmVyKSA9PlxuICAgICAgICAgIGJ1ZmZlcmVkT3V0cHV0LnB1c2goeyBzdHJlYW06IHByb2Nlc3Muc3RkZXJyLCBkYXRhOiBkYXRhIH0pLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuIl19