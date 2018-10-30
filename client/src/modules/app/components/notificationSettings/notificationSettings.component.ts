import {Component, OnInit} from '@angular/core';
import {PushNotificationService} from '../../../shared/services/pushNotification.service';
import {StorageService} from '../../../shared/services/storageService';
import {FeatureService} from '../../../shared/services/feature.service';
import {BrowserFeatureKey} from '../../../shared/models/browserFeatureKey.model';

const NOTIFICATION_SETTINGS_KEY = 'notifications_settings';

@Component({
    selector: 'app-notification-settings',
    templateUrl: 'notificationSettings.component.html'
})
export class NotificationSettingsComponent implements OnInit {
    show: boolean;

    constructor(private readonly pushNotificationService: PushNotificationService,
                private readonly storage: StorageService,
                private readonly _featureService: FeatureService) {

    }

    ngOnInit(): void {
        const settings = this.storage.get(NOTIFICATION_SETTINGS_KEY);
        this.show = !settings && this.pushNotificationService.available &&
            this._featureService.detectFeature(BrowserFeatureKey.PushAPI).supported;
    }

    enable() {
        this.storage.set(NOTIFICATION_SETTINGS_KEY, true);
        this.pushNotificationService.register();
        this.show = false;
    }

    cancel() {
        this.storage.set(NOTIFICATION_SETTINGS_KEY, false);
        this.show = false;
    }
}
