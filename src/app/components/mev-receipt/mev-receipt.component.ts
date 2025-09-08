import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from "@angular/core";
import { CommonModule, DecimalPipe, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { QRCodeComponent } from "angularx-qrcode";
import {
  MevReceipt,
  MevReport,
  MevReportZ,
  PaymentType,
} from "../../services/mev.service";

@Component({
  selector: "app-mev-receipt",
  templateUrl: "./mev-receipt.component.html",
  styleUrls: ["./mev-receipt.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    QRCodeComponent,
    TranslateModule,
    FormsModule,
    DecimalPipe,
    DatePipe,
  ],
})
export class MevReceiptComponent implements OnInit {
  receipt = input<string[]>([]);
  mevReceipt = input.required<MevReceipt>();
  mevReport = input.required<MevReportZ | MevReport>();

  reportPayments: { label: string; value: number }[] = [];
  reportVats: { code: string; percent: string; rate: string; cost: string }[] = [];
  reportReceiptsCount = 0;

  receiptPayments: { label: string; value: number }[] = [];
  receiptVats: { code: string; percent: number; cost: number }[] = [];
  receiptActivities: {
    name: string;
    amount: number;
    price: number;
    cost: number;
  }[] = [];

  public get currentDate(): Date {
    return new Date();
  }

  public get zReport(): MevReportZ {
    return this.mevReport() as unknown as MevReportZ;
  }

  constructor() {}

  ngOnInit(): void {
    if (this.mevReport()) {
      this.bindReportData(this.mevReport());
    }
    if (this.mevReceipt()) {
      this.bindReceiptData(this.mevReceipt());
    }
  }

  bindReportData(report: MevReport): void {
    if (report) {
      this.reportVats = report.daily.taxes.field
        .filter((x) => +x.cost > 0)
        .sort((a, b) => a.code.localeCompare(b.code));

      const shiftPayments: { label: string; value: number }[] = [];

      report.daily.payments.field
        .filter((x) => +x.total > 0)
        .forEach((element) => {
          let label = (Object.keys(PaymentType) as Array<keyof typeof PaymentType>).find(
            (x) => PaymentType[x] === element.type
          );

          if (label) {
            shiftPayments.push({
              label: label.replace("Cash", "Numerar"),
              value: +element.total,
            });
          }
        });

      this.reportPayments = shiftPayments.filter((x) => x.value > 0);

      this.reportReceiptsCount = report.daily.receipts.field.find(
        (x) => x.type === "1"
      )?.count || 0;
    }
  }

  bindReceiptData(receipt: MevReceipt): void {
    if (receipt) {
      this.receiptVats = receipt.activities.taxes.field
        .filter((x) => x.rate && +x.rate > 0)
        .map((x) => ({
          code: x.code,
          percent: +x.percent,
          cost: +x.rate,
        }))
        .sort((a, b) => a.code.localeCompare(b.code));

      const payments: { label: string; value: number }[] = [];

      receipt.data.payments.field
        .filter((x) => +x.deposit > 0)
        .forEach((element) => {
          let label = (Object.keys(PaymentType) as Array<keyof typeof PaymentType>).find(
            (x) => PaymentType[x] === element.type
          );

          if (label) {
            payments.push({
              label: label.replace("Cash", "Numerar"),
              value: +element.deposit,
            });
          }
        });

      this.receiptPayments = payments.filter((x) => x.value > 0);

      // this.receiptActivities = receipt.activities.field.map(x => ({
      //   name: x.name,
      //   amount: +x.amount,
      //   price: +x.price,
      //   cost: +x.cost,
      // }));
    }
  }
}
