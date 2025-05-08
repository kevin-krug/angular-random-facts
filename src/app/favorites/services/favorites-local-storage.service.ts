import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IFactData } from '../../fact/services/fact.service';
import { isPlatformBrowser } from '@angular/common';

const FAVORITES_STORAGE_KEY = 'random-facts-app-favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesLocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  get(): IFactData[] | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return serializedFavorites ? JSON.parse(serializedFavorites) : null;
      } catch(error) {
        console.error('error in parsing favorites', error);
        return null;
      }
    } 
    return null;
  }

  set(favorites: IFactData[]) {
    if (isPlatformBrowser(this.platformId)) {
      const serializedFavorites = JSON.stringify(favorites)
      localStorage.setItem(FAVORITES_STORAGE_KEY, serializedFavorites);
    }
  }

  clear() {
    localStorage.removeItem(FAVORITES_STORAGE_KEY)
  }
}