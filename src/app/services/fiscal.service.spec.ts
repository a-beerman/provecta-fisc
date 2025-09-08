import { TestBed } from '@angular/core/testing';

import { FiscalService } from './fiscal.service';

describe('FiscalService', () => {
  let service: FiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate X report', () => {
    service.generateXReport().subscribe(report => {
      expect(report.type).toBe('X_REPORT');
      expect(report.data).toBeDefined();
      expect(report.timestamp).toBeDefined();
    });
  });

  it('should generate Z report', () => {
    service.generateZReport().subscribe(report => {
      expect(report.type).toBe('Z_REPORT');
      expect(report.data).toBeDefined();
      expect(report.timestamp).toBeDefined();
    });
  });

  it('should process payments', () => {
    service.processPayment('cash', 100).subscribe(result => {
      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
    });
  });
});
