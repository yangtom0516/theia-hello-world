/********************************************************************************
 * Copyright (C) 2025 My Organization.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { CommandRegistry } from '@theia/core/lib/common/command';
import * as React from 'react';

export interface ExternalBrowserLinkProps {
    text: string;
    url: string;
    windowService: WindowService;
}

function BrowserLink(props: ExternalBrowserLinkProps): JSX.Element {
    return <a
        role={'button'}
        tabIndex={0}
        onClick={() => props.windowService.openNewWindow(props.url)}
        href={props.url}
        target='_blank'
    >
        {props.text}
    </a>;
}

export function renderWelcomeHeader(windowService: WindowService, commands?: CommandRegistry): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Welcome to Hello World IDE
        </h3>
        <div>
            Hello World IDE is a modern and extensible development environment built on Theia.
        </div>
        <div>
            <h4>Quick Start</h4>
            <ul className='quick-access-list'>
                <li>
                    <a href="#" onClick={(e) => { 
                        e.preventDefault(); 
                        if (commands) {
                            commands.executeCommand('workbench.action.files.newUntitledFile');
                        }
                    }}>
                        Create a new file
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => { 
                        e.preventDefault(); 
                        if (commands) {
                            commands.executeCommand('workspace:openFolder');
                        }
                    }}>
                        Open folder
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        if (commands) {
                            commands.executeCommand('HelloWorld.command');
                        }
                    }}>
                        Show Hello World
                    </a>
                </li>
            </ul>
        </div>
    </div>;
}

export function renderFeatures(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            IDE Features
        </h3>
        <div>
            Our IDE includes several productivity features:
        </div>
        <ul>
            <li>Modern code editor with syntax highlighting</li>
            <li>Integrated terminal</li>
            <li>File explorer and version control</li>
            <li>Extension support</li>
            <li>Customizable workspace</li>
        </ul>
    </div>;
}

export function renderExtensions(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Extensions
        </h3>
        <div>
            You can extend Hello World IDE by installing VS Code extensions from the <BrowserLink 
            text="OpenVSX registry" 
            url="https://open-vsx.org/"
            windowService={windowService} />. Just open the extension view to browse and install extensions.
        </div>
    </div>;
}

export function renderDocs(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Documentation
        </h3>
        <div>
            Learn more about using Hello World IDE in our <BrowserLink 
            text="documentation" 
            url="https://github.com/yangtom0516/theia-hello-world"
            windowService={windowService} />.
        </div>
    </div>;
}

export function renderSupport(windowService: WindowService): React.ReactNode {
    return <div className='gs-section'>
        <h3 className='gs-section-header'>
            Support
        </h3>
        <div>
            Need help? Visit our <BrowserLink 
            text="support page" 
            url="https://github.com/yangtom0516/theia-hello-world/issues"
            windowService={windowService} /> to report issues or request features.
        </div>
    </div>;
}