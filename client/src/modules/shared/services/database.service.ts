import {Injectable} from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class DatabaseService extends Dexie {
    constructor() {
        super('pwaWorkshop');
        this.initDatabase();
    }

    private initDatabase() {
        this.version(1).stores({
            todos: '++id'
        });
    }
}
