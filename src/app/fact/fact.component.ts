import { Component, OnInit } from '@angular/core';
import {
    FactService,
    IFactData,
    State,
    TFactState
} from './services/fact.service';
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
import {
    FavoritesService,
    TFavoritesById
} from '../favorites/services/favorites.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ErrorComponent } from '../shared/error/error.component';
import { HttpErrorResponse } from '@angular/common/http';

interface IFact {
    factState: State;
    factData: IFactData | null;
    factError: HttpErrorResponse | null;
    factExistsAsFavorite: boolean;
}

type FactStateStrategy = (
    factState: TFactState,
    favoritesById: TFavoritesById
) => IFact;

// extract subset from union type
type TFactStateOf<S extends State> = Extract<TFactState, { state: S }>;

const factStateStrategies: Record<State, FactStateStrategy> = {
    [State.loaded]: (factState, favoritesById) => ({
        factState: State.loaded,
        factData: (factState as TFactStateOf<State.loaded>).data ?? null,
        factError: null,
        factExistsAsFavorite:
            !!favoritesById?.[
                (factState as TFactStateOf<State.loaded>).data!.id
            ]
    }),
    [State.error]: (factState) => ({
        factState: State.error,
        factData: null,
        factError: (factState as TFactStateOf<State.error>).error,
        factExistsAsFavorite: false
    }),

    [State.loading]: () => ({
        factState: State.loading,
        factData: null,
        factError: null,
        factExistsAsFavorite: false
    })
};

@Component({
    selector: 'app-fact',
    imports: [CommonModule, LoaderComponent, ErrorComponent],
    templateUrl: './fact.component.html',
    styleUrl: './fact.component.css'
})
export class FactComponent implements OnInit {
    private fetchTrigger$ = new BehaviorSubject<void>(undefined);
    public State = State;
    factState$ = this.fetchTrigger$.pipe(
        switchMap(() => this.factService.fetchFact()),
        // wait 200ms before emitting loading state
        debounce((state) =>
            state.state === State.loading ? timer(200) : of(0)
        )
    );

    fact$!: Observable<IFact>;

    constructor(
        private factService: FactService,
        private favoritesService: FavoritesService
    ) {}

    ngOnInit() {
        this.fact$ = combineLatest([
            this.factState$,
            this.favoritesService.favoritesById$
        ]).pipe(
            map(([factState, favoritesById]) => {
                return factStateStrategies[factState.state](
                    factState,
                    favoritesById
                );
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
