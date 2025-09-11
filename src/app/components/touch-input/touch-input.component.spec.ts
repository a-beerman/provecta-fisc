import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TouchInputComponent } from './touch-input.component';

describe('TouchInputComponent', () => {
  let component: TouchInputComponent;
  let fixture: ComponentFixture<TouchInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
