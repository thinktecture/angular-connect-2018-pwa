import {Inject, Injectable} from '@angular/core';
import {FeatureService} from './feature.service';
import {from as fromPromise, Observable, of} from 'rxjs';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {WINDOW} from './window.token';

@Injectable()
export class ShareService {
    constructor(private readonly featureService: FeatureService, @Inject(WINDOW) private readonly window: Window) {
    }

    share(title: string, text: string, url: string): Observable<void> {
        const feature = this.featureService.detectFeature(BrowserFeatureKey.WebShareAPI);
        if (feature.supported) {
            return fromPromise(this.shareNative(title, text, url));
        } else {
            this.sendMail(title, text, url);
            return of(void 0);
        }
    }

    private shareNative(title: string, text: string, url: string): Promise<void> {
        return this.window.navigator.share({
            title: title,
            text: text,
            url: url
        });
    }

    private sendMail(title: string, text: string, url: string) {
        let body = text;
        if (url) {
            body += '\r\n';
            body += url;
        }

        this.window.location.href = `mailto:?subject=${title}&body=${encodeURIComponent(body)}`;
    }
}
