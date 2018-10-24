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
        if (!this.swUpdate.isEnabled) {
            return;
        }
        this.subscription = this.swUpdate.available.subscribe(async () =>
            this.notificationId = await this.notificationService
                .showNotification('Update available!', 'Please reload to update the application', 'Reload'));

        this.notificationService.notificationClicked
            .pipe(
                filter(notificationId => notificationId === this.notificationId)
            )
            .subscribe(() => this.window.location.reload());
    }

    unregister() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
