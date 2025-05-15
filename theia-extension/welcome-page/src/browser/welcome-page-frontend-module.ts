import { ContainerModule } from '@theia/core/shared/inversify';
import { WelcomePageWidget } from './welcome-page-widget';
import { WelcomePageContribution } from './welcome-page-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, WelcomePageContribution);
    bind(FrontendApplicationContribution).toService(WelcomePageContribution);
    bind(WelcomePageWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: WelcomePageWidget.ID,
        createWidget: () => ctx.container.get<WelcomePageWidget>(WelcomePageWidget)
    })).inSingletonScope();
});
