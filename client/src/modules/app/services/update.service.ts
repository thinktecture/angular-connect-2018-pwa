import {Inject, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../shared/services/notification.service';
import {WINDOW} from '../../shared/services/window.token';
import {filter} from 'rxjs/operators';

@Injectable()
export class UpdateService {
    private subscription: Subscription;
    private notificationId: string;

    constructor(@Inject(WINDOW) private readonly window: Window, private readonly swUpdate: SwUpdate, private readonly notificationService: NotificationService) {
    }

    register() {
        // TODO
    }

    unregister() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
