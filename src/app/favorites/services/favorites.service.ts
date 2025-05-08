import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IFactData } from '../../fact/services/fact.service';
import { FavoritesLocalStorageService } from './favorites-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject: BehaviorSubject<IFactData[]> = new BehaviorSubject([] as IFactData[]);
  private searchFilterSubject = new BehaviorSubject<string | null>(null);
  
  favorites$ = this.favoritesSubject.asObservable().pipe(
    tap((favorites) => this.localStorageService.set(favorites))
  )
  searchFilter$ = this.searchFilterSubject.asObservable();

  constructor(private localStorageService: FavoritesLocalStorageService) {
    const savedFavorites = this.localStorageService.get();
    if( savedFavorites ){
      this.favoritesSubject.next(savedFavorites);
    }
  }

  add(newFavorite : IFactData) {
    this.favoritesSubject.next([...this.favoritesSubject.value, newFavorite]);
  }

  remove(favoriteIdToRemove: string) {
    this.favoritesSubject.next(this.favoritesSubject.value.filter((favorite)=> favorite.id !== favoriteIdToRemove))
  }

  setFilter(filterText: string | null) {
    this.searchFilterSubject.next(filterText);
  }

  clearFilter() {
    this.searchFilterSubject.next(null);
  }
}
