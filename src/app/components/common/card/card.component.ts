import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() sm: boolean;
  classes = ['card'];

  constructor() {}

  ngOnInit() {
    if (this.sm) {
      this.classes.push('sm');
    }
  }
}
