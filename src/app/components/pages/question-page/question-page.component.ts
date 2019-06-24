import { translateStatement } from '@angular/compiler-cli/src/ngtsc/translator';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { IAnswer, IQuestion, IResponse } from 'src/app/models/stackoverflow';
import { StackoverflowService } from 'src/app/services/stackoverflow.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  questionId: number;
  question: IQuestion;
  answers: Array<IAnswer>;
  hasMore = false;
  page = 1;

  constructor(private route: ActivatedRoute,
              private stackService: StackoverflowService) { }

  ngOnInit() {
    let obs: Observable<any>;
    this.route.paramMap.subscribe(params => {
      this.questionId = +params.get('id');
      obs = forkJoin(this.stackService.question(this.questionId), this.stackService.answers(this.questionId, this.page));
    });

    obs.subscribe((res: Array<any>) => {
      this.question = (res[0] as IResponse<IQuestion>).items[0];
      const answers = res[1] as IResponse<IAnswer>;
      this.answers = answers.items;
      this.hasMore = answers.has_more;
    });
  }

  loadMore() {
    this.stackService.answers(this.questionId, this.page + 1)
      .subscribe((answers: IResponse<IAnswer>) => {
        this.page++;
        this.answers.push(...answers.items);
        this.hasMore = answers.has_more;
      });
  }
}
