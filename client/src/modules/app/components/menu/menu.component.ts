import {Component} from '@angular/core';
import {BlurService} from '../../services/blur.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent {
    isOpen: boolean;

    constructor(private readonly blurService: BlurService) {
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.blurService.toggleBlur();
    }

    close() {
        this.isOpen = false;
        this.blurService.focusApplication();
    }
}
