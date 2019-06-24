import { Component, Input } from '@angular/core';
import { IAnswer } from 'src/app/models/stackoverflow';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {

  @Input() answer: IAnswer;

  constructor() { }
}
