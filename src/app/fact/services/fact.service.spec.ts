import { TestBed } from '@angular/core/testing';

import { FactService } from './fact.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('FactService', () => {
    let service: FactService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(FactService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
