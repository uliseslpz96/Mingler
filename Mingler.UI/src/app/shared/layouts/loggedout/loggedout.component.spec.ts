import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedoutComponentLayout } from './loggedout.component';

describe('LoggedoutComponent', () => {
  let component: LoggedoutComponentLayout;
  let fixture: ComponentFixture<LoggedoutComponentLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedoutComponentLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedoutComponentLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
