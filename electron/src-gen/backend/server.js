// @ts-check
require('reflect-metadata');

// Patch electron version if missing, see https://github.com/eclipse-theia/theia/pull/7361#pullrequestreview-377065146
if (typeof process.versions.electron === 'undefined' && typeof process.env.THEIA_ELECTRON_VERSION === 'string') {
    process.versions.electron = process.env.THEIA_ELECTRON_VERSION;
}

// Erase the ELECTRON_RUN_AS_NODE variable from the environment, else Electron apps started using Theia will pick it up.
if ('ELECTRON_RUN_AS_NODE' in process.env) {
    delete process.env.ELECTRON_RUN_AS_NODE;
}

const path = require('path');
process.env.THEIA_APP_PROJECT_PATH = path.resolve(__dirname, '..', '..')
const express = require('express');
const { Container } = require('inversify');
const { BackendApplication, BackendApplicationServer, CliManager } = require('@theia/core/lib/node');
const { backendApplicationModule } = require('@theia/core/lib/node/backend-application-module');
const { messagingBackendModule } = require('@theia/core/lib/node/messaging/messaging-backend-module');
const { loggerBackendModule } = require('@theia/core/lib/node/logger-backend-module');

const container = new Container();
container.load(backendApplicationModule);
container.load(messagingBackendModule);
container.load(loggerBackendModule);

function defaultServeStatic(app) {
    app.use(express.static(path.resolve(__dirname, '../../lib/frontend')))
}

function load(raw) {
    return Promise.resolve(raw).then(
        module => container.load(module.default)
    );
}

async function start(port, host, argv = process.argv) {
    if (!container.isBound(BackendApplicationServer)) {
        container.bind(BackendApplicationServer).toConstantValue({ configure: defaultServeStatic });
    }
    let result = undefined;
    await container.get(CliManager).initializeCli(argv.slice(2), 
        () => container.get(BackendApplication).configured,
        async () => {
            result = container.get(BackendApplication).start(port, host);
        });
    if (result) {
        return result;
    } else {
        return Promise.reject(0);
    }
}

module.exports = async (port, host, argv) => {
    try {
        await load(require('@theia/core/lib/node/i18n/i18n-backend-module'));
        await load(require('@theia/core/lib/electron-node/cli/electron-backend-cli-module'));
        await load(require('@theia/core/lib/electron-node/keyboard/electron-backend-keyboard-module'));
        await load(require('@theia/core/lib/electron-node/token/electron-token-backend-module'));
        await load(require('@theia/core/lib/electron-node/hosting/electron-backend-hosting-module'));
        await load(require('@theia/core/lib/electron-node/request/electron-backend-request-module'));
        await load(require('@theia/filesystem/lib/node/filesystem-backend-module'));
        await load(require('@theia/filesystem/lib/node/download/file-download-backend-module'));
        await load(require('@theia/workspace/lib/node/workspace-backend-module'));
        await load(require('@theia/ai-core/lib/node/ai-core-backend-module'));
        await load(require('@theia/ai-anthropic/lib/node/anthropic-backend-module'));
        await load(require('@theia/process/lib/common/process-common-module'));
        await load(require('@theia/process/lib/node/process-backend-module'));
        await load(require('@theia/file-search/lib/node/file-search-backend-module'));
        await load(require('@theia/ai-huggingface/lib/node/huggingface-backend-module'));
        await load(require('@theia/ai-llamafile/lib/node/llamafile-backend-module'));
        await load(require('@theia/ai-mcp/lib/node/mcp-backend-module'));
        await load(require('@theia/ai-ollama/lib/node/ollama-backend-module'));
        await load(require('@theia/ai-openai/lib/node/openai-backend-module'));
        await load(require('@theia/scanoss/lib/node/scanoss-backend-module'));
        await load(require('@theia/terminal/lib/node/terminal-backend-module'));
        await load(require('@theia/task/lib/node/task-backend-module'));
        await load(require('@theia/debug/lib/node/debug-backend-module'));
        await load(require('@theia/remote/lib/electron-node/remote-backend-module'));
        await load(require('@theia/dev-container/lib/electron-node/dev-container-backend-module'));
        await load(require('@theia/external-terminal/lib/electron-node/external-terminal-backend-module'));
        await load(require('@theia/preferences/lib/node/preference-backend-module'));
        await load(require('@theia/mini-browser/lib/node/mini-browser-backend-module'));
        await load(require('@theia/metrics/lib/node/metrics-backend-module'));
        await load(require('@theia/metrics/lib/electron-node/electron-metrics-backend-module'));
        await load(require('@theia/search-in-workspace/lib/node/search-in-workspace-backend-module'));
        await load(require('@theia/plugin-ext/lib/plugin-ext-backend-electron-module'));
        await load(require('@theia/plugin-dev/lib/node-electron/plugin-dev-electron-backend-module'));
        await load(require('@theia/plugin-ext-vscode/lib/node/plugin-vscode-backend-module'));
        await load(require('@theia/vsx-registry/lib/common/vsx-registry-common-module'));
        await load(require('@theia/vsx-registry/lib/node/vsx-registry-backend-module'));
        await load(require('theia-ide-launcher-ext/lib/node/launcher-backend-module'));
        await load(require('theia-ide-register-interface-ext/lib/node/register-interface-backend-module'));
        return await start(port, host, argv);
    } catch (error) {
        if (typeof error !== 'number') {
            console.error('Failed to start the backend application:');
            console.error(error); 
            process.exitCode = 1;
        }
        throw error;
    }
}
