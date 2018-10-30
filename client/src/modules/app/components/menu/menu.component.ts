import {Component, OnInit} from '@angular/core';
import {BlurService} from '../../services/blur.service';
import {InstallPromptService} from '../../../shared/services/install-prompt.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit {
    isOpen: boolean;
    showAddToHomeScreen: boolean;

    constructor(private readonly blurService: BlurService, private readonly installBannerServer: InstallPromptService) {
    }

    ngOnInit(): void {
        this.installBannerServer.installPrompt.subscribe(() => this.showAddToHomeScreen = true);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.blurService.toggleBlur();
    }

    close() {
        this.isOpen = false;
        this.blurService.focusApplication();
    }

    addToHomeScreen() {
        this.installBannerServer.register();
        this.close();
    }
}
