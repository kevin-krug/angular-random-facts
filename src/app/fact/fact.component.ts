import { Component, OnInit } from '@angular/core';
import { FactService, IFactData } from './services/fact.service';
import {
    BehaviorSubject,
    combineLatest,
    debounce,
    map,
    Observable,
    of,
    switchMap,
    timer
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites/services/favorites.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ErrorComponent } from '../shared/error/error.component';

interface IFact {
    factState: string;
    factData: IFactData | null;
    factExistsAsFavorite: boolean;
}

@Component({
    selector: 'app-fact',
    imports: [CommonModule, LoaderComponent, ErrorComponent],
    templateUrl: './fact.component.html',
    styleUrl: './fact.component.css'
})
export class FactComponent implements OnInit {
    private fetchTrigger$ = new BehaviorSubject<void>(undefined);
    factState$ = this.fetchTrigger$.pipe(
        switchMap(() => this.factService.fetchFact()),
        debounce((state) => (state.state === 'loading' ? timer(200) : of(0)))
    );

    fact$!: Observable<IFact>;

    constructor(
        private factService: FactService,
        private favoritesService: FavoritesService
    ) {}

    ngOnInit() {
        this.fetchData();
        this.fact$ = combineLatest([
            this.factState$,
            this.favoritesService.favoritesById$
        ]).pipe(
            map(([factState, favoritesById]) => {
                return {
                    factState: factState.state,
                    factData:
                        factState.state === 'loaded' ? factState.data : null,
                    factExistsAsFavorite:
                        factState.state === 'loaded'
                            ? !!favoritesById?.[factState.data.id]
                            : false
                };
            })
        );
    }

    refetchFact() {
        this.fetchData();
    }

    saveFact(fact: IFactData | null) {
        if (fact) {
            this.favoritesService.add(fact);
        }
    }

    private fetchData() {
        this.fetchTrigger$.next();
    }
}
