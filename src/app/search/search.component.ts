import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFactData } from '../fact/services/fact.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  favorites$!: Observable<IFactData[]>;;
  
  constructor(
    private favoritesService: FavoritesService
  ) {}
  
  ngOnInit() {
    this.favorites$ = this.favoritesService.favoritesAsArray$;
  }

  // TODO: add correct event type
  setSearchFilter(event: any) {
    this.favoritesService.setFilter(event?.target?.value)
  }
}
