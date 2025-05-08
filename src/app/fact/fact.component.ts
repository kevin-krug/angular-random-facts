import { Component, OnInit } from '@angular/core';
import { FactService, TFactState } from './services/fact.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    ) {}
  
    ngOnInit() {
      this.data$ = this.factService.fetchFact();    
    }
}
