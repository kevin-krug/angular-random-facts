import { TestBed } from '@angular/core/testing';

import { FactService, IFactData, TFactState } from './fact.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}
function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

describe('FactService', () => {
    let factService: FactService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    const expectedFact: IFactData = {
        id: '62516dd4ec8fc4e3289ee971316bd155',
        text: 'Mel Blanc (the voice of Bugs Bunny) was allergic to carrots.',
        source: 'djtech.net',
        source_url: 'http://www.djtech.net/humor/useless_facts.htm',
        language: 'en',
        permalink:
            'https://uselessfacts.jsph.pl/api/v2/facts/62516dd4ec8fc4e3289ee971316bd155'
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [
                FactService,
                { provide: HttpClient, useValue: httpClientSpy }
            ]
        });

        factService = TestBed.inject(FactService);
    });

    it('should be created', () => {
        expect(factService).toBeTruthy();
    });

    it('should emit loading state and then loaded state with expected data', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(expectedFact));

        const emittedStates: TFactState[] = [];

        factService.fetchFact().subscribe({
            next: (state) => {
                emittedStates.push(state);
            },
            complete: () => {
                expect(emittedStates[0]).toEqual({ state: 'loading' });
                expect(emittedStates[1]).toEqual({
                    state: 'loaded',
                    data: expectedFact
                });
                done();
            },
            error: done.fail
        });
    });

    it('should emit loading and then error state on http error', (done: DoneFn) => {
        const testError = new HttpErrorResponse({
            status: 500,
            statusText: 'Internal Server Error',
            error: 'server failure'
        });

        httpClientSpy.get.and.returnValue(asyncError(testError));

        const emittedStates: TFactState[] = [];

        factService.fetchFact().subscribe({
            next: (state) => {
                emittedStates.push(state);
            },
            complete: () => {
                expect(emittedStates.length).toBe(2);
                expect(emittedStates[0]).toEqual({ state: 'loading' });

                expect(emittedStates[1].state).toBe('error');
                expect(
                    (
                        emittedStates[1] as {
                            state: 'error';
                            error: HttpErrorResponse;
                        }
                    ).error.status
                ).toBe(500);
                done();
            },
            error: done.fail // not be called
        });
    });
});
