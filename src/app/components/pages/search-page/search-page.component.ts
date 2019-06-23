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
    this.stackService.similar(value, this.page)
      .subscribe(questions => {
        this.page++;
        this.hasMore = questions.has_more;
        this.questions = questions.items;
      });
  }

  loadMore() {
    if (!this.hasMore) { return; }
    this.stackService.similar(this.search, this.page)
      .subscribe(questions => {
        this.page++;
        this.hasMore = questions.has_more;
        this.questions.push(...questions.items);
      });
  }
}
