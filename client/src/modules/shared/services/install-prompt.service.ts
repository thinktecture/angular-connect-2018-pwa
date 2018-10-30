import {WINDOW} from './window.token';
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class InstallPromptService {
    private readonly renderer: Renderer2;
    private event: BeforeInstallPromptEvent;
    public installPrompt = new Subject();

    constructor(rendererFactory: RendererFactory2, @Inject(WINDOW) private readonly window) {
        this.renderer = rendererFactory.createRenderer(this.window, null);
    }

    register() {
        this.renderer.listen(this.window, 'beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
            event.preventDefault(); // Prevent default for older Chrome versions to prevent double install prompt
            this.event = event;
            this.installPrompt.next();
        });
    }

    showPrompt() {
        if (this.event) {
            this.event.prompt();
        }
    }
}
