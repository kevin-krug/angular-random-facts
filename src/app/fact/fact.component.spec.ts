import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactComponent } from './fact.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FactComponent', () => {
    let component: FactComponent;
    let fixture: ComponentFixture<FactComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FactComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()]
        }).compileComponents();

        fixture = TestBed.createComponent(FactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
