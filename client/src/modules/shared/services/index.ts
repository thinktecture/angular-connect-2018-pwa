import {FeatureService} from './feature.service';
import {TodoService} from './todo.service';
import {PushNotificationService} from './pushNotification.service';
import {SyncService} from './sync.service';
import {DatabaseService} from './database.service';
import {NotificationService} from './notification.service';
import {ShareService} from './share.service';
import {AppStateService} from './appState.service';
import {InstallBannerService} from './installBanner.service';
import {ApiService} from './api.service';

export const SHARED_SERVICES = [
    FeatureService,
    PushNotificationService,
    TodoService,
    ApiService,
    DatabaseService,
    SyncService,
    NotificationService,
    ShareService,
    AppStateService,
    InstallBannerService,
];
