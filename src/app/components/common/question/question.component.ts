import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/stackoverflow';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() question: IQuestion;

  constructor() { }
}
