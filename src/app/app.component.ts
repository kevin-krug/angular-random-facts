import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FactComponent } from './fact/fact.component';
import { FavoritesComponent } from './favorites/favorites.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FactComponent, FavoritesComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'random-facts-app';

  constructor() {}
}
