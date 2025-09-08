import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MevReceiptInfoComponent } from './mev-receipt-info.component';

describe('MevReceiptInfoComponent', () => {
  let component: MevReceiptInfoComponent;
  let fixture: ComponentFixture<MevReceiptInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MevReceiptInfoComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MevReceiptInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
