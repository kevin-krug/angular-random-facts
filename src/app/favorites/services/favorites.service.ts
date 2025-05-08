import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFactData } from '../../fact/services/fact.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject: BehaviorSubject<IFactData[]> = new BehaviorSubject([] as IFactData[]);
  favorites$ = this.favoritesSubject.asObservable()

  constructor() {
  }

  add(newFavorite : IFactData) {
    this.favoritesSubject.next([...this.favoritesSubject.value, newFavorite]);
  }

  remove(favoriteIdToRemove: string) {
    this.favoritesSubject.next(this.favoritesSubject.value.filter((favorite)=> favorite.id !== favoriteIdToRemove))
  }
}
