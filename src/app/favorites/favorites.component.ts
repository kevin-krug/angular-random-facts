import { Component, OnInit } from '@angular/core';
import { IFactData } from '../fact/services/fact.service';
import { combineLatest, map, Observable } from 'rxjs';
import { FavoritesService } from './services/favorites.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
    selector: 'app-favorites',
    imports: [CommonModule, LoaderComponent],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
    filteredFavorites$!: Observable<IFactData[]>;
    hasFavorites$!: Observable<boolean>;
    favoritesLoading$!: Observable<boolean>;

    constructor(private favoritesService: FavoritesService) {}

    ngOnInit() {
        this.favoritesLoading$ = this.favoritesService.favoritesLoading$;
        this.hasFavorites$ = this.favoritesService.favoritesAsArray$.pipe(
            map((favoritesAsArray) => !!favoritesAsArray.length)
        );

        this.filteredFavorites$ = combineLatest([
            this.favoritesService.favoritesAsArray$,
            this.favoritesService.searchFilter$
        ]).pipe(
            map(([favorites, searchFilter]) => {
                if (searchFilter) {
                    // fuzzy search
                    // const fuse = new Fuse(this.favorites, {
                    //     keys: ['text'],
                    //     threshold: 0.4  // tune sensitivity (lower -> stricter)
                    //   });

                    // const results = fuse.search(searchFilter);
                    // return results.map(result => result.item);

                    return favorites.filter((fact) =>
                        fact.text
                            .toLowerCase()
                            .includes(searchFilter.toLowerCase())
                    );
                }
                return favorites;
            })
        );
    }

    removeFavorite(id: string) {
        this.favoritesService.remove(id);
    }

    clearAllFavorites() {
        this.favoritesService.clearAll();
    }
}
