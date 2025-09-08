import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MevReceiptComponent } from '../mev-receipt/mev-receipt.component';
import { MevReceipt, MevReport, MevReportZ } from '../../services/mev.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mev-receipt-info',
  templateUrl: './mev-receipt-info.component.html',
  styleUrls: ['./mev-receipt-info.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, MevReceiptComponent],
})
export class MevReceiptInfoComponent implements OnInit, OnDestroy {
  readonly receipt = input.required<string[]>();
  readonly mevReceipt = input.required<MevReceipt>();
  readonly mevReport = input.required<MevReport | MevReportZ>();
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
