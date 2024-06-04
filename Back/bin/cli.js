#! /user/bin/env node

/* eslint-disable */
const { execSync } = require("child_process");

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch (err) {
        console.error(`Failed to execute ${command}`, err);
        return false;
    }
    return true;
};

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/igc-Tech-Projects/boilerplate-nest.git  ${repoName}`;

const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the respository with name ${repoName}`);

const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(-1);

console.log(`Installing depedencies for ${repoName}`);

const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) process.exit(-1);

console.log(`Congratulations! You are ready. Follow the following commands to start`);

console.log(`cd ${repoName} && npm start`);
