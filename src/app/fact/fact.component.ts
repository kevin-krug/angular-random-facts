import { Component, OnInit } from '@angular/core';
import { FactService, IFactData } from './services/fact.service';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
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
export class FactComponent  implements OnInit {
  private fetchTrigger$ = new BehaviorSubject<void>(undefined);
  factState$ = this.fetchTrigger$.pipe(
    switchMap(() => this.factService.fetchFact())
  );

  fact$!: Observable<IFact>

  isLoading$ = this.factState$.pipe(
    map(state => state.state === 'loading'),
    debounceTime(200),
    distinctUntilChanged()
  );

  constructor(
      private factService: FactService,
      private favoritesService: FavoritesService
    ) {
    }

    ngOnInit() {
      this.fetchData();      
      this.fact$ = combineLatest([this.factState$, this.favoritesService.favoritesById$]).pipe(
        map(
          ([factState, favoritesById]) => {            
            return {
            factState: factState.state,
            factData: factState.state === "loaded" ? factState.data : null,
            factExistsAsFavorite: factState.state === "loaded" ? !!favoritesById?.[factState.data.id] : false
          }}
        )
      );
    }

    refetchFact() {
      this.fetchData();
    }

    saveFact(fact: IFactData | null) {
      if(fact) {
        this.favoritesService.add(fact)
      } 
    }

    private fetchData () {
      this.fetchTrigger$.next();
    }
}
