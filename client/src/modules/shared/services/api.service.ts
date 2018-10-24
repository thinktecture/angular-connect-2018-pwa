import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {
    private readonly apiBaseUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiBaseUrl = environment.apiUrl;
        if (!this.apiBaseUrl.endsWith('/')) {
            this.apiBaseUrl += '/';
        }
    }

    get(urlSuffix: string): Observable<any> {
        return this.httpClient.get(this.getApiUrl(urlSuffix));
    }

    put(urlSuffix: string, payload: any): Observable<any> {
        return this.httpClient.put(this.getApiUrl(urlSuffix), payload);
    }

    post(urlSuffix: string, payload: any): Observable<any> {
        return this.httpClient.post(this.getApiUrl(urlSuffix), payload);
    }

    delete(urlSuffix: string): Observable<any> {
        return this.httpClient.delete(this.getApiUrl(urlSuffix));
    }

    private getApiUrl(urlSuffix: string): string {
        return `${this.apiBaseUrl}${urlSuffix}`;
    }
}
