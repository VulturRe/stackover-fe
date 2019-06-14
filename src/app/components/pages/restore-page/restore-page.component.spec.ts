import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePageComponent } from './restore-page.component';

describe('RestorePageComponent', () => {
  let component: RestorePageComponent;
  let fixture: ComponentFixture<RestorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
