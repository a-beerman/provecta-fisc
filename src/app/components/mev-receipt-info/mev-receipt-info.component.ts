import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MevReceiptComponent } from '../mev-receipt/mev-receipt.component';
import { MevReceipt, MevReport, MevReportZ } from '../../services/mev.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mev-receipt-info',
  templateUrl: './mev-receipt-info.component.html',
  styleUrls: ['./mev-receipt-info.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, MevReceiptComponent],
})
export class MevReceiptInfoComponent implements OnInit, OnDestroy {
  @Input() receipt!: string[];
  @Input() mevReceipt!: MevReceipt;
  @Input() mevReport!: MevReport | MevReportZ;
  unsubscribe$: Subject<any> = new Subject();

  constructor(private modalCtrl: ModalController) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit(): void {}
}
