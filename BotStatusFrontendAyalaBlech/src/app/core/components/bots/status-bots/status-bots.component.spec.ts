import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBotsComponent } from './status-bots.component';

describe('StatusBotsComponent', () => {
  let component: StatusBotsComponent;
  let fixture: ComponentFixture<StatusBotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
