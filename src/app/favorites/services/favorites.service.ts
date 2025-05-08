import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IFactData } from '../../fact/services/fact.service';
import { FavoritesLocalStorageService } from './favorites-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject: BehaviorSubject<IFactData[]> = new BehaviorSubject([] as IFactData[]);
  private selectedFactSubject = new BehaviorSubject<string | null>(null);
  

  favorites$ = this.favoritesSubject.asObservable().pipe(
    tap((favorites) => this.localStorageService.set(favorites))
  )
  selectedFact$ = this.selectedFactSubject.asObservable();

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

  setSelectedFact(text: string | null) {
    this.selectedFactSubject.next(text);
  }

  clearSelectedFact() {
    this.selectedFactSubject.next(null);
  }
}
