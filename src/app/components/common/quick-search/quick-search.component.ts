import { Component, Input } from '@angular/core';
import { IQuestion, IShallowUser } from 'src/app/models/stackoverflow';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent {

  @Input() tag: string;
  @Input() user: IShallowUser;
  @Input() questions: Array<IQuestion>;

  constructor() { }
}
