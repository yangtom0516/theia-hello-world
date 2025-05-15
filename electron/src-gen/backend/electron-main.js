// @ts-check

require('@theia/core/shared/reflect-metadata');

// Useful for Electron/NW.js apps as GUI apps on macOS doesn't inherit the `$PATH` define
// in your dotfiles (.bashrc/.bash_profile/.zshrc/etc).
// https://github.com/electron/electron/issues/550#issuecomment-162037357
// https://github.com/eclipse-theia/theia/pull/3534#issuecomment-439689082
require('@theia/core/electron-shared/fix-path').default();

// Workaround for https://github.com/electron/electron/issues/9225. Chrome has an issue where
// in certain locales (e.g. PL), image metrics are wrongly computed. We explicitly set the
// LC_NUMERIC to prevent this from happening (selects the numeric formatting category of the
// C locale, http://en.cppreference.com/w/cpp/locale/LC_categories).
if (process.env.LC_ALL) {
    process.env.LC_ALL = 'C';
}
process.env.LC_NUMERIC = 'C';

const { resolve } = require('path');
const theiaAppProjectPath = resolve(__dirname, '..', '..');
process.env.THEIA_APP_PROJECT_PATH = theiaAppProjectPath;
const { default: electronMainApplicationModule } = require('@theia/core/lib/electron-main/electron-main-application-module');
const { ElectronMainApplication, ElectronMainApplicationGlobals } = require('@theia/core/lib/electron-main/electron-main-application');
const { Container } = require('@theia/core/shared/inversify');
const { app } = require('electron');

const config = {
    "applicationName": "FalconEyeDe",
    "defaultTheme": {
        "light": "light",
        "dark": "dark"
    },
    "defaultIconTheme": "theia-file-icons",
    "electron": {
        "windowOptions": {},
        "showWindowEarly": false,
        "splashScreenOptions": {
            "content": "resources/TheiaIDESplash.svg",
            "height": 276,
            "width": 446
        },
        "uriScheme": "theia"
    },
    "defaultLocale": "",
    "validatePreferencesSchema": true,
    "reloadOnReconnect": true,
    "uriScheme": "theia",
    "preferences": {
        "toolbar.showToolbar": true,
        "security.workspace.trust.enabled": false
    }
};
const isSingleInstance = true;

(async () => {
    if (isSingleInstance && !app.requestSingleInstanceLock()) {
        // There is another instance running, exit now. The other instance will request focus.
        app.quit();
        return;
    }
    
    const container = new Container();
    container.load(electronMainApplicationModule);
    container.bind(ElectronMainApplicationGlobals).toConstantValue({
        THEIA_APP_PROJECT_PATH: theiaAppProjectPath,
        THEIA_BACKEND_MAIN_PATH: resolve(__dirname, 'main.js'),
        THEIA_FRONTEND_HTML_PATH: resolve(__dirname, '..', '..', 'lib', 'frontend', 'index.html'),
        THEIA_SECONDARY_WINDOW_HTML_PATH: resolve(__dirname, '..', '..', 'lib', 'frontend', 'secondary-window.html')
    });
    
    function load(raw) {
        return Promise.resolve(raw.default).then(module =>
            container.load(module)
        );
    }
    
    async function start() {
        const application = container.get(ElectronMainApplication);
        await application.start(config);
    }

    try {
        await load(require('@theia/filesystem/lib/electron-main/electron-main-module'));
        await load(require('theia-ide-product-ext/lib/electron-main/theia-ide-main-module'));
        await load(require('theia-ide-updater-ext/lib/electron-main/update/theia-updater-main-module'));
        await start();
    } catch (reason) {
        if (typeof reason !== 'number') {
            console.error('Failed to start the electron application.');
            if (reason) {
                console.error(reason);
            }
        }
        app.quit();
    };
})();
