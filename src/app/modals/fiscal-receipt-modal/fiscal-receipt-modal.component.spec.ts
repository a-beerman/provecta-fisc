import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FiscalReceiptModalComponent } from './fiscal-receipt-modal.component';

describe('FiscalReceiptModalComponent', () => {
  let component: FiscalReceiptModalComponent;
  let fixture: ComponentFixture<FiscalReceiptModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FiscalReceiptModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiscalReceiptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
