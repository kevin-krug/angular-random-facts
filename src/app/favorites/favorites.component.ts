import { Component } from '@angular/core';
import { IFactData } from '../fact/services/fact.service';
import { Observable } from 'rxjs';
import { FavoritesService } from './services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favorites$: Observable<IFactData[]>;;

  constructor(
    private favoritesService: FavoritesService
  ) {
    this.favorites$ = this.favoritesService.favorites$;
  }

  removeFavorite(id: string) {
    this.favoritesService.remove(id)
  }
}
