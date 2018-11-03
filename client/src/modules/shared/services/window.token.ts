import {InjectionToken} from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WindowToken');

export function _window(): Window {
    return global ? { navigator: {} as any, addEventListener() {}, removeEventListener() {} } as any : window;
}
