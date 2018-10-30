import {FeatureService} from './feature.service';
import {TodoService} from './todo.service';
import {PushNotificationService} from './pushNotification.service';
import {SyncService} from './sync.service';
import {DatabaseService} from './database.service';
import {NotificationService} from './notification.service';
import {ShareService} from './share.service';
import {AppStateService} from './appState.service';
import {InstallPromptService} from './install-prompt.service';
import {ApiService} from './api.service';
import {StorageService} from './storageService';

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
    InstallPromptService,
    StorageService,
];
