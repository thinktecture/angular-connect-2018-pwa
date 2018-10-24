import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: 'notification.component.html',
})
export class NotificationComponent implements OnInit {
    private notificationId: string;

    title: string;
    message: string;
    isActive: boolean;
    button: string;

    constructor(private readonly notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notificationService.notifications.subscribe(notification => {
            this.title = notification.title;
            this.message = notification.message;
            this.isActive = true;
            this.button = notification.button;
            this.notificationId = notification.id;
        });
    }

    onClick() {
        this.notificationService.notificationClicked.next(this.notificationId);
    }

    close() {
        this.isActive = false;
    }
}
