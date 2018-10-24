import {WINDOW} from './window.token';
import {Inject, Renderer2, RendererFactory2} from '@angular/core';

export class InstallBannerService {
    private readonly renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2, @Inject(WINDOW) private readonly window) {
        this.renderer = rendererFactory.createRenderer(this.window, null);
    }

    register() {
        this.renderer.listen(this.window, 'beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
            event.preventDefault(); // Prevent default for older Chrome versions to prevent double install prompt
            console.log('beforeinstallprompt event called');
            event.prompt();
        });
    }
}
