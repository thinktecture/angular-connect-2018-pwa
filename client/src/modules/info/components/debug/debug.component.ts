import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {PushNotificationService} from '../../../shared/services/pushNotification.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {WINDOW} from '../../../shared/services/window.token';
import {ApiService} from '../../../shared/services/api.service';
import {TodoService} from '../../../shared/services/todo.service';

@Component({
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.scss']
})
export class DebugComponent {
    @ViewChild('info') info: ElementRef;
    debugInfo = '';

    constructor(private readonly todoService: TodoService, private readonly pushNotificationService: PushNotificationService,
                private readonly notificationService: NotificationService, private readonly apiService: ApiService,
                @Inject(WINDOW) private readonly window: Window) {
    }

    async clearDatabase() {
        await this.todoService.clear();
        this.addDebugInfo('Database cleared.')
    }

    unregisterPush() {
        this.pushNotificationService.unregister()
            .subscribe(success => {
                if (success) {
                    this.addDebugInfo('Push notifications unregistered.');
                } else {
                    this.addDebugInfo('Unregister push notificationSettings failed.')
                }
            });
    }

    async unregisterServiceWorker() {
        const registrations = await this.window.navigator.serviceWorker.getRegistrations();
        registrations.forEach(registration => registration.unregister());
        this.addDebugInfo('Service worker unregistered.');
    }

    clearInfo() {
        this.debugInfo = '';
    }

    showTestNotification() {
        this.notificationService.showNotification('PWA Workshop', 'Hello audience! Nice to meet you!', null, true);
    }

    sendPushNotification() {
        this.apiService.post('push/notifyAll', {
            title: 'Push Notification',
            body: 'This is a push notificationSettings!'
        }).subscribe();
    }

    enableNotifications() {
        this.pushNotificationService.register();
    }

    private addDebugInfo(info: string) {
        this.debugInfo += `${info}\r\n`;
        this.info.nativeElement.scrollTop = this.info.nativeElement.scrollHeight;
    }
}
