import { Component } from '@angular/core';
import { IFactData } from '../fact/services/fact.service';
import { combineLatest, map, Observable } from 'rxjs';
import { FavoritesService } from './services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  filteredFavorites$: Observable<IFactData[]>;;

  constructor(
    private favoritesService: FavoritesService
  ) {
    this.filteredFavorites$ = combineLatest(
      [
        this.favoritesService.favorites$, 
        this.favoritesService.selectedFact$
      ]).pipe(
        map(([favorites, selectedFact]) => {
        if(selectedFact) {
          // TODO: filter by Id
          return favorites.filter(fact => fact.text === selectedFact)
        }
        return favorites;
      })
    );
  }

  removeFavorite(id: string) {
    this.favoritesService.remove(id)
  }
}
