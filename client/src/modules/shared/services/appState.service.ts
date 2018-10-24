import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {WINDOW} from './window.token';

@Injectable()
export class AppStateService {
    private readonly renderer: Renderer2;
    private readonly stateChange = new BehaviorSubject<boolean>(true);
    private onlineListenerFn = () => void 0;
    private offlineListenerFn = () => void 0;

    get onlineStateChange(): Observable<boolean> {
        return this.stateChange;
    }

    constructor(rendererFactory: RendererFactory2, @Inject(WINDOW) private _window) {
        this.renderer = rendererFactory.createRenderer(this._window, null);
        this.stateChange.next(this._window.navigator.onLine);
    }

    initialize() {
        this.onlineListenerFn = this.renderer.listen(this._window, 'online', () => this.stateChange.next(true));
        this.offlineListenerFn = this.renderer.listen(this._window, 'offline', () => this.stateChange.next(false));
    }

    dispose() {
        this.onlineListenerFn();
        this.onlineListenerFn();
    }
}
