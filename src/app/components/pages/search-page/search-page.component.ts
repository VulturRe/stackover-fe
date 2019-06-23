import { Component } from '@angular/core';
import { IQuestion } from 'src/app/models/stackoverflow';
import { StackoverflowService } from 'src/app/services/stackoverflow.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  page = 1;
  search: string;
  hasMore = false;
  questions: Array<IQuestion> = [];

  constructor(private stackService: StackoverflowService) { }

  onSearch(value: string) {
    this.search = value;
    if (!this.search || this.search.trim().length === 0) { return; }
    if (value.split(' ').length === 1) {
      this.stackService.search(null, value, this.page)
        .subscribe(questions => {
          this.hasMore = questions.has_more;
          this.questions = questions.items;
        });
    } else {
      this.stackService.similar(value, this.page)
        .subscribe(questions => {
          this.hasMore = questions.has_more;
          this.questions = questions.items;
        });
    }
  }

  loadMore() {
    if (!this.hasMore || !this.search || this.search.trim().length === 0) { return; }
    if (this.search.split(' ').length === 1) {
      this.stackService.search(null, this.search, this.page + 1)
        .subscribe(questions => {
          this.page++;
          this.hasMore = questions.has_more;
          this.questions.push(...questions.items);
        });
    }
    this.stackService.similar(this.search, this.page + 1)
      .subscribe(questions => {
        this.page++;
        this.hasMore = questions.has_more;
        this.questions.push(...questions.items);
      });
  }
}
