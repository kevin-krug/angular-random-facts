import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FactService, TFactState } from './fact/services/fact.service';
import { Observable  } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'random-facts-app';
  data$!: Observable<TFactState>;

  constructor(
		private factService: FactService,
	) {}

  // TODO: move to fact component
  ngOnInit() {
    this.data$ = this.factService.fetchFact();    
  }
}
