import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from 'src/app/models/stackoverflow';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() question: IQuestion;
  @Input() notClickable: boolean;
  @Input() noWrapper: boolean;
  @Output() tagClick = new EventEmitter<string>();
  @Output() authorClick = new EventEmitter<void>();

  constructor() { }

  onTagClick(tag: string) {
    this.tagClick.emit(tag);
  }

  onAuthorClick() {
    this.authorClick.emit();
  }
}
