import { Component, OnInit } from '@angular/core';
import { FactService, IFactData, TFactState } from './services/fact.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites/services/favorites.service';

@Component({
  selector: 'app-fact',
  imports: [CommonModule],
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent  implements OnInit {
  data$!: Observable<TFactState>;

  constructor(
      private factService: FactService,
      private favoritesService: FavoritesService
    ) {}

    ngOnInit() {
      this.fetchData()
    }

    refetchFact() {
      this.fetchData() 
    }

    saveFact(factState: TFactState) {
      if (factState.state === 'loaded') {
        this.favoritesService.add(factState.data)
      }
    }

    private fetchData () {
      this.data$ = this.factService.fetchFact();    
    }
}
