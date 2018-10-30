import {Injectable} from '@angular/core';

const STORAGE_KEY = 'PWA_Demo: ';

@Injectable()
export class StorageService {
    get(key: string): any {
        return localStorage.getItem(`${STORAGE_KEY}${key}`);
    }

    set(key: string, value: any) {
        localStorage.setItem(`${STORAGE_KEY}${key}`, value);
    }

    remove(key: string) {
        localStorage.removeItem(`${STORAGE_KEY}${key}`);
    }

    clear() {
        localStorage.clear();
    }
}
