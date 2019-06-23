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

  emit(event: KeyboardEvent) {
    if (event) {
      if (event.key === 'Enter') {
        this.search.emit(this.value);
      } else {
        return;
      }
    } else {
      this.search.emit(this.value);
    }
  }
}
