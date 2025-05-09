import { Component, OnInit } from '@angular/core';
import { FactService, IFactData, TFactState } from './services/fact.service';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoritesService, TFavoritesById } from '../favorites/services/favorites.service';

interface IFactWithFavorites {
  factState: string;
  factData: IFactData | null;
  favoriteIdAlreadyExists: boolean;
}

@Component({
  selector: 'app-fact',
  imports: [CommonModule],
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent  implements OnInit {
  private fetchTrigger$ = new BehaviorSubject<void>(undefined);
  factState$ = this.fetchTrigger$.pipe(
    switchMap(() => this.factService.fetchFact())
  );

  factWithFavorites$!: Observable<IFactWithFavorites>

  constructor(
      private factService: FactService,
      private favoritesService: FavoritesService
    ) {
    }

    ngOnInit() {
      this.fetchData();      
      this.factWithFavorites$ = combineLatest([this.factState$, this.favoritesService.favoritesById$]).pipe(
        map(
          ([factState, favoritesById]) => {            
            return {
            factState: factState.state,
            factData: factState.state === "loaded" ? factState.data : null,
            favoriteIdAlreadyExists: factState.state === "loaded" ? !!favoritesById?.[factState.data.id] : false
          }}
        )
      );
    }

    refetchFact() {
      this.fetchData();
    }

    saveFact(fact: IFactData) {
      console.log('fact', fact)
      this.favoritesService.add(fact)
    }

    private fetchData () {
      this.fetchTrigger$.next();
    }
}
