import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
// import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { Message } from '@theia/core/lib/browser';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { CommandRegistry } from '@theia/core/lib/common/command';
import { 
    renderWelcomeHeader, 
    renderFeatures, 
    renderExtensions,
    renderDocs,
    renderSupport
} from './branding-util';
import './style/index.css';

@injectable()
export class WelcomePageWidget extends ReactWidget {

    static readonly ID = 'welcome-page:widget';
    static readonly LABEL = 'Welcome';

    @inject(MessageService)
    protected readonly messageService!: MessageService;
    
    @inject(WindowService)
    protected readonly windowService!: WindowService;

    @inject(CommandRegistry)
    protected readonly commandRegistry!: CommandRegistry;

    @postConstruct()
    protected init(): void {
        this.doInit()
    }

    protected async doInit(): Promise <void> {
        this.id = WelcomePageWidget.ID;
        this.title.label = WelcomePageWidget.LABEL;
        this.title.caption = WelcomePageWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-home'; // Changed to home icon for welcome page
        this.update();
    }

    render(): React.ReactElement {
        return <div id='welcome-container' className='gs-container'>
            <div className='gs-content'>
                {renderWelcomeHeader(this.windowService, this.commandRegistry)}
                {renderFeatures(this.windowService)}
                {renderExtensions(this.windowService)}
                {renderDocs(this.windowService)}
                {renderSupport(this.windowService)}
                
                <div className='gs-section'>
                    <button id='displayMessageButton' 
                           className='theia-button primary' 
                           title='Display Message' 
                           onClick={_a => this.displayMessage()}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Welcome to Hello World IDE!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('displayMessageButton');
        if (htmlElement) {
            htmlElement.focus();
        }
    }
}
// import * as React from 'react';
// import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
// import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
// import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
// import { MessageService } from '@theia/core';
// import { Message } from '@theia/core/lib/browser';

// @injectable()
// export class WelcomePageWidget extends ReactWidget {

//     static readonly ID = 'welcome-page:widget';
//     static readonly LABEL = 'Welcome';

//     @inject(MessageService)
//     protected readonly messageService!: MessageService;

//     @postConstruct()
//     protected init(): void {
//         this.doInit()
//     }

//     protected async doInit(): Promise <void> {
//         this.id = WelcomePageWidget.ID;
//         this.title.label = WelcomePageWidget.LABEL;
//         this.title.caption = WelcomePageWidget.LABEL;
//         this.title.closable = true;
//         this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
//         this.update();
//     }

//     render(): React.ReactElement {
//         const header = `This is a sample widget which simply calls the messageService
//         in order to display an info message to end users.`;
//         return <div id='widget-container'>
//             <AlertMessage type='INFO' header={header} />
//             <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
//         </div>
//     }

//     protected displayMessage(): void {
//         this.messageService.info('Welcome to Hello World IDE!');
//     }

//     protected onActivateRequest(msg: Message): void {
//         super.onActivateRequest(msg);
//         const htmlElement = document.getElementById('displayMessageButton');
//         if (htmlElement) {
//             htmlElement.focus();
//         }
//     }

// }
