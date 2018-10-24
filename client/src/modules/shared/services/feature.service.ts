import {Inject, Injectable} from '@angular/core';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {BrowserFeature} from '../models/browserFeature.model';
import {detect} from 'detect-browser';
import {WINDOW} from './window.token';

@Injectable()
export class FeatureService {
    private readonly navigator: Navigator;
    private readonly features: any;
    private browser: any;

    constructor(@Inject(WINDOW) private window: Window) {
        this.navigator = this.window.navigator;
        this.browser = detect();

        this.features = {
            [BrowserFeatureKey.ServiceWorker]: 'serviceWorker' in this.window.navigator,
            [BrowserFeatureKey.Cache]: 'caches' in this.window,
            [BrowserFeatureKey.PushAPI]: 'PushManager' in this.window,
            [BrowserFeatureKey.NotificationsAPI]: 'Notification' in this.window,
            [BrowserFeatureKey.BeforeInstallPromptEvent]: 'BeforeInstallPromptEvent' in this.window,
            [BrowserFeatureKey.BackgroundSync]: 'SyncManager' in this.window,
            [BrowserFeatureKey.NavigationPreloadManager]: 'NavigationPreloadManager' in this.window,
            [BrowserFeatureKey.BudgetAPI]: 'budget' in this.navigator && 'reserve' in (<any>this.navigator).budget,
            [BrowserFeatureKey.StorageEstimation]: 'storage' in this.navigator && 'estimate' in (<any>this.navigator).storage,
            [BrowserFeatureKey.PersistentStorage]: 'storage' in this.navigator && 'persist' in (<any>this.navigator).storage,
            [BrowserFeatureKey.WebShareAPI]: 'share' in this.navigator,
            [BrowserFeatureKey.MediaSessionAPI]: 'mediaSession' in this.navigator,
            [BrowserFeatureKey.MediaCapabilities]: 'mediaCapabilities' in this.navigator,
            [BrowserFeatureKey.DeviceMemory]: 'deviceMemory' in this.navigator,
            [BrowserFeatureKey.RelatedApps]: 'getInstalledRelatedApps' in this.navigator,
            [BrowserFeatureKey.PaymentRequestAPI]: 'PaymentRequest' in this.window,
            [BrowserFeatureKey.CredentialManagement]: 'credentials' in this.navigator,
            [BrowserFeatureKey.WebBluetoothAPI]: 'bluetooth' in this.navigator,
        };
    }

    detectFeatures(): Array<BrowserFeature> {
        return Object.keys(this.features).map(key => new BrowserFeature(key, this.features[key]));
    }

    detectFeature(feature: BrowserFeatureKey): BrowserFeature {
        return new BrowserFeature(feature, this.features[feature]);
    }

    getBrowserName() {
        return this.browser.name;
    }

    getBrowserVersion() {
        return this.browser.version;
    }

    isMobileAndroid(): boolean {
        return this.window.navigator.userAgent.toLowerCase().indexOf('android') > -1;
    }
}
