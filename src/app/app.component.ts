import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FactComponent } from './fact/fact.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FactComponent, FavoritesComponent, SearchComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'random-facts-app';
}
