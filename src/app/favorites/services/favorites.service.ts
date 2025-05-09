import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, map, tap } from 'rxjs';
import { IFactData } from '../../fact/services/fact.service';
import { FavoritesLocalStorageService } from './favorites-local-storage.service';

export type TFavoritesById = Record<string, IFactData>

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesByIdSubject: BehaviorSubject<TFavoritesById> = new BehaviorSubject({} as TFavoritesById);
  private searchFilterSubject = new BehaviorSubject<string | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  favoritesLoading$ = this.loadingSubject.asObservable();

  favoritesById$ = this.favoritesByIdSubject.asObservable();
  favoritesAsArray$ = this.favoritesByIdSubject.asObservable().pipe(
    tap((favorites) => this.localStorageService.set(favorites)),
    map((favorites) => Object.values(favorites))
  )

  searchFilter$ = this.searchFilterSubject.asObservable();

  constructor(private localStorageService: FavoritesLocalStorageService) {
    const savedFavorites = this.localStorageService.get();
    if( savedFavorites ){
      this.favoritesByIdSubject.next(savedFavorites);
    }
    // TODO: for demo purposes simulate delay to show loading state
    this.loadingSubject.next(false);
  }

  add(favoriteToAdd : IFactData) {
    if(this.favoritesByIdSubject.value[favoriteToAdd.id]) {
      console.warn('fact id already exists in favorites', favoriteToAdd.id);
    }
    this.favoritesByIdSubject.next({...this.favoritesByIdSubject.value, [favoriteToAdd.id]: favoriteToAdd});
  }

  remove(idToRemove: string) {
    const { [idToRemove]: _favoriteToRemove, ...newFavorites } = this.favoritesByIdSubject.value;
    this.favoritesByIdSubject.next(newFavorites)
  }

  clearAll() {
    this.favoritesByIdSubject.next({});
    this.localStorageService.clear()
  }

  setFilter(filterText: string | null) {
    this.searchFilterSubject.next(filterText);
  }

  clearFilter() {
    this.searchFilterSubject.next(null);
  }
}
