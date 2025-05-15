import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';

export const HelloWorldCommand: Command = {
    id: 'HelloWorld.command',
    label: 'Say Hello'
};

@injectable()
export class HelloWorldCommandContribution implements CommandContribution {
    
    @inject(MessageService)
    protected readonly messageService!: MessageService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class HelloWorldMenuContribution implements MenuContribution {

    private static readonly EXTENSIONS_MENU: string[] = [
        ...CommonMenus.HELP,
        'extensions'
    ];

    registerMenus(menus: MenuModelRegistry): void {
        /* 1️⃣ Create “Extensions” under the Help top-level menu */
        menus.registerSubmenu(
            HelloWorldMenuContribution.EXTENSIONS_MENU,
            'Extensions'
        );

        /* 2️⃣ Place the “Say Hello” command inside that submenu */
        menus.registerMenuAction(
            HelloWorldMenuContribution.EXTENSIONS_MENU,
            {
                commandId: HelloWorldCommand.id,
                label: HelloWorldCommand.label,
                order: '00'
            }
        );
    }

}
