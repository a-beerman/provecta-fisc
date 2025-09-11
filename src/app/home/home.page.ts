import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  receiptOutline,
  settingsOutline,
  statsChartOutline,
  businessOutline,
  cashOutline,
  cardOutline,
  printOutline,
  archiveOutline,
  peopleOutline,
  calculatorOutline,
  cloudDownloadOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { MevReceiptInfoComponent } from '../components/mev-receipt-info/mev-receipt-info.component';
import { NumpadComponent } from '../components/numpad/numpad.component';
import { MevService } from '../services/mev.service';
import { HttpErrorResponse } from '@angular/common/http';

interface SectionCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  action: () => void;
}

interface AppSection {
  title: string;
  cards: SectionCard[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonToast,
  ],
})
export class HomePage implements OnInit {
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  sections: AppSection[] = [
    {
      title: 'Reports',
      cards: [
        {
          id: 'x-report',
          title: 'X Report',
          icon: 'document-text-outline',
          color: 'primary',
          action: () => this.generateXReport(),
        },
        {
          id: 'z-report',
          title: 'Z Report',
          icon: 'stats-chart-outline',
          color: 'secondary',
          action: () => this.generateZReport(),
        },
        // {
        //   id: 'fiscal-memory',
        //   title: 'Fiscal Memory',
        //   icon: 'archive-outline',
        //   color: 'tertiary',
        //   action: () => this.readFiscalMemory(),
        // },
      ],
    },
    {
      title: 'Cash Operations',
      cards: [
        {
          id: 'cash-in',
          title: 'Cash In',
          icon: 'cash-outline',
          color: 'success',
          action: () => this.cash('in'),
        },
        {
          id: 'cash-out',
          title: 'Cash Out',
          icon: 'card-outline',
          color: 'warning',
          action: () => this.cash('out'),
        },
        // {
        //   id: 'cash-balance',
        //   title: 'Cash Balance',
        //   icon: 'calculator-outline',
        //   color: 'medium',
        //   action: () => this.checkCashBalance(),
        // },
      ],
    },
    {
      title: 'Receipts',
      cards: [
        {
          id: 'new-receipt',
          title: 'New Receipt',
          icon: 'receipt-outline',
          color: 'primary',
          action: () => this.openReceiptsModal(),
        },
        {
          id: 'receipt-history',
          title: 'Receipt History',
          icon: 'business-outline',
          color: 'secondary',
          action: () => this.viewReceiptHistory(),
        },
        {
          id: 'print-duplicate',
          title: 'Print Duplicate',
          icon: 'print-outline',
          color: 'tertiary',
          action: () => this.printDuplicate(),
        },
      ],
    },
  ];

  constructor(
    private translate: TranslateService,
    private mevService: MevService,
    // private fiscalService: FiscalService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    addIcons({
      documentTextOutline,
      receiptOutline,
      settingsOutline,
      statsChartOutline,
      businessOutline,
      cashOutline,
      cardOutline,
      printOutline,
      archiveOutline,
      peopleOutline,
      calculatorOutline,
      cloudDownloadOutline,
    });
  }

  ngOnInit() {}

  trackByCardId(index: number, card: SectionCard): string {
    return card.id;
  }

  // Reports methods
  async generateXReport() {
    const loading = await this.loadingController.create({
      message: 'Generare Raport X...',
    });
    await loading.present();

    this.mevService
      .addReport(false)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: (report: any) => {
          this.showMevReceiptInfo(report.response.text);
          // this.showSuccessMessage('Raportul X a fost generat cu succes');
        },
        error: (error: any) => {
          this.handleMessage(error);
        },
      });
  }

  async generateZReport() {
    const confirmed = await this.showConfirmationAlert(
      'Generare Raport Z',
      'Sunteți sigur că doriți să generați Raportul Z? Această operațiune va închide ziua fiscală.',
      'Generează',
      'Anulează'
    );

    if (!confirmed) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Generare Raport Z...',
    });
    await loading.present();

    this.mevService
      .addReport(true)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: (report: any) => {
          this.showMevReceiptInfo(report.response.text);
        },
        error: (error: any) => {
          this.handleMessage(error);
        },
      });
  }

  // Cash Operations methods
  async cash(dir: 'in' | 'out') {
    const modal = await this.modalController.create({
      component: NumpadComponent,
      componentProps: {
        value: 0,
        decimals: 2,
        // maximum: this.maximum,
        title: `Sumă Cash ${dir === 'in' ? 'Intrare' : 'Ieșire'}`,
      },
      cssClass: 'numpad-modal',
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (!data || role !== 'ok') {
      return;
    }

    const loading = await this.loadingController.create({
      message: `Procesare ${dir === 'in' ? 'Intrare' : 'Ieșire'} Cash...`,
    });
    await loading.present();

    this.mevService
      .addServiceReceipt(parseFloat(data) * (dir === 'in' ? 1 : -1))
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: (report: any) => {
          this.showMevReceiptInfo(report.response.text);
        },
        error: (error: any) => {
          this.handleMessage(error);
        },
      });
  }

  checkCashBalance() {
    this.showInfoMessage('Cash Balance check - to be implemented');
  }

  // Receipts methods
  viewReceiptHistory() {
    this.showInfoMessage('Receipt History - to be implemented');
  }

  printDuplicate() {
    this.showInfoMessage('Print Duplicate - to be implemented');
  }

  async openReportsModal() {
    const { ReportsModalComponent } = await import(
      './modals/reports-modal/reports-modal.component'
    );
    const modal = await this.modalController.create({
      component: ReportsModalComponent,
      cssClass: 'reports-modal',
    });
    return await modal.present();
  }

  async openReceiptsModal() {
    const { ReceiptsModalComponent } = await import(
      './modals/receipts-modal/receipts-modal.component'
    );
    const modal = await this.modalController.create({
      component: ReceiptsModalComponent,
      cssClass: 'receipts-modal',
    });
    return await modal.present();
  }

  readFiscalMemory() {
    // this.fiscalService.getFiscalMemory().subscribe({
    //   next: (report: any) => {
    //     this.showSuccessMessage('Fiscal memory read successfully');
    //   },
    //   error: (error: any) => {
    //     this.showErrorMessage('Error reading fiscal memory');
    //   },
    // });
  }

  private showSuccessMessage(message: string) {
    this.toastMessage = message;
    this.toastColor = 'success';
    this.showToast = true;
  }

  private showErrorMessage(message: string) {
    this.toastMessage = message;
    this.toastColor = 'danger';
    this.showToast = true;
  }

  private showInfoMessage(message: string) {
    this.toastMessage = message;
    this.toastColor = 'primary';
    this.showToast = true;
  }

  handleMessage(
    err: HttpErrorResponse & { errors: any[] },
    action?: (role: string) => void
  ) {
    const exception = err?.error as any;
    let message = exception?.Message || '';

    if (!message) {
      if (typeof err.error === 'string') {
        // If the error is a string, use it directly
        message = err.error;
      } else if (err.error && err.error.message) {
        // If the error is an object with a message property, use that
        message = err.error.message;
      } else if (err.error && err.error.Message) {
        // If the error is an object with a Message property, use that
        message = err.error.Message;
      }
    }

    if (!message) {
      message = err.message;
    }

    // Handle structured error response with validation errors
    if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
      const errorMessages = err.error.errors.map((error: any) => {
        if (error.property && error.constraints) {
          const constraintMessages = Object.values(error.constraints).join(
            ', '
          );
          return `${error.property}: ${constraintMessages}`;
        }
        return JSON.stringify(error);
      });

      const pattern =
        err.error.pattern ||
        err.error.message ||
        'Validation failed with errors:';
      message = `${pattern}\n${errorMessages.join('<br/>')}`;
    }
    // Handle simple array of errors (fallback)
    else if (err.errors) {
      message = err.errors.join(', ');
    }

    if (err.error?.response?.errors) {
      const additionalMessage = Object.keys(err.error.response.errors)
        .map((key) => err.error.response.errors[key].message)
        .filter((msg) => msg)
        .join('<br/>');

      if (additionalMessage) {
        message += `<br/><br/>${additionalMessage}`;
      }
    }

    if (!message) {
      return;
    }

    this.warn(message, action);
  }

  async warn(message: string, action?: (role: string) => void) {
    const buttons = [
      {
        text: 'Ok',
        role: 'cancel',
      },
    ];

    if (action) {
      buttons.push({
        text: await this.translate.get('Retry').toPromise(),
        role: 'retry',
      });
    }

    const confirm = await this.alertController.create({
      message,
      buttons,
    });

    await confirm.present();

    // const { role } = await confirm.onDidDismiss();
    // if (action) {
    //   action(role);
    // }
  }

  async showConfirmationAlert(
    title: string,
    message: string,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: confirmText,
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  private showMevReceiptInfo(receipt: string[]): void {
    this.modalController
      .create({
        component: MevReceiptInfoComponent,
        componentProps: {
          receipt,
        },
        cssClass: 'mev-receipt',
      })
      .then((modal) => {
        modal.present();
      });
  }
}
