import { Component, ComponentFactoryResolver, QueryList, TemplateRef, ViewChildren, ViewContainerRef } from '@angular/core';
import { QuickSearchComponent } from 'src/app/components/common/quick-search/quick-search.component';
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
  openedQuickSearchPanels: Array<number> = [];

  @ViewChildren('quickSearch', {
    read: ViewContainerRef
  }) quickSearchPanels: QueryList<ViewContainerRef>;

  constructor(private stackService: StackoverflowService,
              private factoryResolver: ComponentFactoryResolver) { }

  onSearch(value: string) {
    this.search = value;
    if (!this.search || this.search.trim().length === 0) { return; }
    if (value.split(' ').length === 1) {
      this.stackService.searchByTag(value, this.page)
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
      this.stackService.searchByTag(this.search, this.page + 1)
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

  onTagClick(tag: string, question: IQuestion) {
    const index = this.questions.findIndex(q => q.question_id === question.question_id);
    if (index === -1) { return; }
    const quickSearchPanel = this.quickSearchPanels.toArray()[index];
    const openedIndex = this.openedQuickSearchPanels.findIndex(i => i === index);
    if (openedIndex !== -1) {
      this.openedQuickSearchPanels.splice(openedIndex, 1);
      quickSearchPanel.detach(0);
    } else {
      this.stackService.searchByTag(tag, 1, 3, 'desc', 'votes')
        .subscribe(questions => {
          this.openedQuickSearchPanels.push(index);
          const factory = this.factoryResolver.resolveComponentFactory(QuickSearchComponent);
          const componentRef = quickSearchPanel.createComponent(factory);
          componentRef.instance.tag = tag;
          componentRef.instance.questions = questions.items;
        });
    }
  }

  onAuthorClick(question: IQuestion) {
    const index = this.questions.findIndex(q => q.question_id === question.question_id);
    if (index === -1) { return; }
    const quickSearchPanel = this.quickSearchPanels.toArray()[index];
    const openedIndex = this.openedQuickSearchPanels.findIndex(i => i === index);
    if (openedIndex !== -1) {
      this.openedQuickSearchPanels.splice(openedIndex, 1);
      quickSearchPanel.detach(0);
    } else {
      this.stackService.userQuestions(question.owner.user_id)
        .subscribe(questions => {
          this.openedQuickSearchPanels.push(index);
          const factory = this.factoryResolver.resolveComponentFactory(QuickSearchComponent);
          const componentRef = quickSearchPanel.createComponent(factory);
          componentRef.instance.user = question.owner;
          componentRef.instance.questions = questions.items;
        });
    }
  }
}
