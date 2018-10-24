import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap, tap} from 'rxjs/operators';
import {AppStateService} from '../../../shared/services/appState.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    private onlineChangeSubscription: Subscription;

    title: string;
    isAppOnline = true;

    constructor(private readonly router: Router, private readonly route: ActivatedRoute,
                private readonly appStateService: AppStateService) {
    }

    ngOnInit() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.route),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                mergeMap((route) => route.data),
                tap(event => this.title = event.title)
            ).subscribe();

        this.appStateService.initialize();
        this.onlineChangeSubscription = this.appStateService.onlineStateChange.subscribe(online => this.isAppOnline = online);
    }

    ngOnDestroy() {
        this.appStateService.dispose();
        if (this.onlineChangeSubscription) {
            this.onlineChangeSubscription.unsubscribe();
        }
    }
}
