import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FactComponent } from './fact/fact.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FactComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'random-facts-app';

  constructor() {}
}
