import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TFavoritesById } from './favorites.service';

const FAVORITES_STORAGE_KEY = 'random-facts-app-favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesLocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  get(): TFavoritesById | null {
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

  set(favorites: TFavoritesById) {
    if (isPlatformBrowser(this.platformId)) {
      const serializedFavorites = JSON.stringify(favorites)
      localStorage.setItem(FAVORITES_STORAGE_KEY, serializedFavorites);
    }
  }

  clear() {
    localStorage.removeItem(FAVORITES_STORAGE_KEY)
  }
}