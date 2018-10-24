import {Observable, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class BlurService {
    private readonly blurChange$ = new BehaviorSubject<boolean>(false);

    get onBlurChange(): Observable<boolean> {
        return this.blurChange$;
    }

    toggleBlur() {
        this.blurChange$.next(!this.blurChange$.getValue());
    }

    blurApplication() {
        this.blurChange$.next(true);
    }

    focusApplication() {
        this.blurChange$.next(false);
    }
}
