import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ISyncItem} from '../models/contracts/syncItem.interface';
import {map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable()
export class SyncService {
    constructor(private readonly _apiService: ApiService) {
    }

    sync(collection: Array<ISyncItem>): Observable<Array<ISyncItem>> {
        return this._apiService.post('sync', collection)
            .pipe(
                map(result => result)
            );
    }
}
