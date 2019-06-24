import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  value: string;
  @Input() initialValue: string;
  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.value = this.initialValue;
  }

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
