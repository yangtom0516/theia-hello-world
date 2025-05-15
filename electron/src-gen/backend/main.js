// @ts-check
const { BackendApplicationConfigProvider } = require('@theia/core/lib/node/backend-application-config-provider');
const main = require('@theia/core/lib/node/main');

BackendApplicationConfigProvider.set({
    "singleInstance": true,
    "frontendConnectionTimeout": -1,
    "configurationFolder": ".theia-ide",
    "startupTimeout": -1,
    "resolveSystemPlugins": false
});

globalThis.extensionInfo = [
    {
        "name": "@theia/electron",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/core",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/variable-resolver",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/editor",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/filesystem",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/workspace",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/markers",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/outline-view",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/monaco",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/output",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-core",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-anthropic",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-history",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/process",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/file-search",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-chat",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/navigator",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/editor-preview",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-chat-ui",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-code-completion",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-huggingface",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-llamafile",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-mcp",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-ollama",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-openai",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/scanoss",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-scanoss",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/terminal",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-terminal",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/ai-ide",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/bulk-edit",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/callhierarchy",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/collaboration",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/console",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/userstorage",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/task",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/test",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/debug",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/remote",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/dev-container",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/external-terminal",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/preferences",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/keymaps",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/mini-browser",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/preview",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/getting-started",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/memory-inspector",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/messages",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/metrics",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/notebook",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/scm",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/search-in-workspace",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/timeline",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/typehierarchy",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/plugin-ext",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/plugin-dev",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/plugin-ext-vscode",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/property-view",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/secondary-window",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/toolbar",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "@theia/vsx-registry",
        "version": "1.59.0-next.72+f41d8efcd"
    },
    {
        "name": "theia-ide-launcher-ext",
        "version": "1.59.0"
    },
    {
        "name": "theia-ide-product-ext",
        "version": "1.59.0"
    },
    {
        "name": "theia-ide-register-interface-ext",
        "version": "1.0.0"
    },
    {
        "name": "theia-ide-updater-ext",
        "version": "1.59.0"
    }
];

const serverModule = require('./server');
const serverAddress = main.start(serverModule());

serverAddress.then((addressInfo) => {
    if (process && process.send && addressInfo) {
        process.send(addressInfo);
    }
});

globalThis.serverAddress = serverAddress;
