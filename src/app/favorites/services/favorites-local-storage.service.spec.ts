import { TestBed } from '@angular/core/testing';

import { FavoritesLocalStorageService } from './favorites-local-storage.service';

describe('FavoritesLocalStorageService', () => {
    let service: FavoritesLocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FavoritesLocalStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
