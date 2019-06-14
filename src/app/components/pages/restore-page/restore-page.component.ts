import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restore-page',
  templateUrl: './restore-page.component.html',
  styleUrls: ['./restore-page.component.scss']
})
export class RestorePageComponent implements OnInit {

  restoreForm = new FormGroup({
    login: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

}
