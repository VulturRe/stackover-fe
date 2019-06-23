import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  value: string;
  @Output() search = new EventEmitter<string>();

  constructor() { }

  emit() {
    this.search.emit(this.value);
  }
}
