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

export enum State {
    loading,
    error,
    loaded
}

export type TFactState =
    | { state: State.loading }
    | { state: State.error; error: HttpErrorResponse }
    | { state: State.loaded; data: IFactData };

@Injectable({
    providedIn: 'root'
})
export class FactService {
    constructor(private http: HttpClient) {}

    fetchFact(): Observable<TFactState> {
        return this.http.get<IFactData>(environment.apiUrlEndpoint).pipe(
            map((data) => ({ state: State.loaded, data }) as const),
            catchError((error) => of({ state: State.error, error } as const)), // return observable to resume stream
            startWith({ state: State.loading } as const)
        );
    }
}
