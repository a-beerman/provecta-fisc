import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExportControlTapeModalComponent } from './export-control-tape-modal.component';

describe('ExportControlTapeModalComponent', () => {
  let component: ExportControlTapeModalComponent;
  let fixture: ComponentFixture<ExportControlTapeModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExportControlTapeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportControlTapeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
