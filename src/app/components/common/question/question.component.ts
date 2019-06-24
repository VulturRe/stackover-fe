import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() questionClick = new EventEmitter<void>();

  constructor(private router: Router) { }

  onTagClick(tag: string) {
    this.tagClick.emit(tag);
  }

  onAuthorClick() {
    this.authorClick.emit();
  }

  onQuestionClick() {
    this.router.navigate(['/question', this.question.question_id]);
  }
}
