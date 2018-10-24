import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlurService} from '../../services/blur.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'root.component.html',
})
export class RootComponent implements OnInit, OnDestroy {
    private blurChangeSubscription: Subscription;

    isBlurActive = false;

    constructor(private readonly blurService: BlurService) {
    }

    ngOnInit() {
        this.blurService.onBlurChange.subscribe(blur => this.isBlurActive = blur);
    }

    ngOnDestroy() {
        if (this.blurChangeSubscription) {
            this.blurChangeSubscription.unsubscribe();
        }

        console.log('test');
    }
}
