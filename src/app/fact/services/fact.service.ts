import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IFactData {
    id: string;
    text: string;
    source: string;
    source_url: string;
    language: string;
    permalink: string;
}

export type TFactState =
    | { state: 'loading' }
    | { state: 'error'; error: HttpErrorResponse }
    | { state: 'loaded'; data: IFactData };

@Injectable({
    providedIn: 'root'
})
export class FactService {
    constructor(private http: HttpClient) {}

    fetchFact(): Observable<TFactState> {
        return this.http.get<IFactData>(environment.apiUrlEndpoint).pipe(
            map((data) => ({ state: 'loaded', data }) as const),
            catchError((error) => of({ state: 'error', error } as const)),
            startWith({ state: 'loading' } as const)
        );
    }
}
