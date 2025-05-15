import { injectable, inject } from '@theia/core/shared/inversify';
import { MenuModelRegistry } from '@theia/core';
import { WelcomePageWidget } from './welcome-page-widget';
import { AbstractViewContribution, CommonMenus } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { WindowService } from '@theia/core/lib/browser/window/window-service';

export const WelcomePageCommand: Command = { id: 'welcome-page:command' };

@injectable()
export class WelcomePageContribution extends AbstractViewContribution<WelcomePageWidget> {

    @inject(WindowService)
    protected readonly windowService: WindowService;
    /** Path for Help ▸ Extensions */
    private static readonly EXTENSIONS_MENU: string[] = [
        ...CommonMenus.HELP,         // ['help']
        'extensions'                 // → ['help','extensions']
    ];
    constructor() {
        super({
            widgetId: WelcomePageWidget.ID,
            widgetName: WelcomePageWidget.LABEL,
            defaultWidgetOptions: { area: 'main' },
            toggleCommandId: WelcomePageCommand.id
        });
    }
    
    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand({ id: 'welcome-page:command', label: 'Welcome Page' }, {
            execute: () => this.openView({ activate: true, reveal: true })
        });
    }
    // registerCommands(commands: CommandRegistry): void {
    //     commands.registerCommand(WelcomePageCommand, {
    //         execute: () => {
    //             this.windowService.openNewWindow('https://theia-ide.org/', { external: true });
    //         }
    //     });
    // };

     /* ----- menu ----- */
     registerMenus(menus: MenuModelRegistry): void {
        // 1. Create the “Extensions” submenu under Help (once per run, safe to call repeatedly)
        menus.registerSubmenu(WelcomePageContribution.EXTENSIONS_MENU, 'Extensions');

        // 2. Add our “Welcome” item to that submenu
        menus.registerMenuAction(WelcomePageContribution.EXTENSIONS_MENU, {
            commandId: WelcomePageCommand.id,
            label: 'Welcome',
            order: '01'
        });

        /* Do NOT call super.registerMenus(menus) here,
           otherwise the contribution would also appear under View. */
    }
}
