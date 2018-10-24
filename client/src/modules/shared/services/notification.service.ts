import {FeatureService} from './feature.service';
import {Subject} from 'rxjs';
import {AppNotification} from '../models/appNotification.model';
import {Injectable} from '@angular/core';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import * as UUID from 'uuid';

@Injectable()
export class NotificationService {
    public readonly notifications = new Subject<AppNotification>();
    public readonly notificationClicked = new Subject<string>();

    constructor(private readonly featureService: FeatureService) {
    }

    async showNotification(title: string, message: string, button?: string, showNative = false): Promise<string> {
        const id = UUID.v4();
        if (showNative && this.featureService.detectFeature(BrowserFeatureKey.NotificationsAPI).supported
            && !this.featureService.isMobileAndroid()) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const notification = new Notification(title, {
                    body: message
                });
                notification.onclick = () => {
                    this.notificationClicked.next(id);
                };
                return id;
            }
        }
        this.showInAppNotification(title, message, button, id);
        return id;
    }

    private showInAppNotification(title: string, message: string, button: string, id) {
        this.notifications.next(new AppNotification(title, message, button, id));
    }
}
