import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  signal,
} from '@angular/core';
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
  addCircleOutline,
} from 'ionicons/icons';
import { finalize, tap } from 'rxjs';
import { NumpadComponent } from '../components/numpad/numpad.component';
import { MevService } from '../services/mev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MevCardModalComponent } from '../modals/mev-card-modal/mev-card-modal.component';
import { MevReceiptInfoComponent } from '../modals/mev-receipt-info/mev-receipt-info.component';
import { Utils } from '../services/utils';

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
export class HomePage implements OnInit, AfterViewInit {
  exportControlTape(): void {
    throw new Error('Method not implemented.');
  }
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
        {
          id: 'export-control-tape',
          title: 'Export Control Tape',
          icon: 'cloud-download-outline',
          color: 'tertiary',
          action: () => this.openExportControlTapeModal(),
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
      title: 'Operations',
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
          icon: 'cash-outline',
          color: 'warning',
          action: () => this.cash('out'),
        },
        {
          id: 'add-mev-card',
          title: 'Adaugă Card MEV',
          icon: 'add-circle-outline',
          color: 'success',
          action: () => this.openMevCardModal(),
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
        // {
        //   id: 'receipt-history',
        //   title: 'Receipt History',
        //   icon: 'business-outline',
        //   color: 'secondary',
        //   action: () => this.viewReceiptHistory(),
        // },
        // {
        //   id: 'print-duplicate',
        //   title: 'Print Duplicate',
        //   icon: 'print-outline',
        //   color: 'tertiary',
        //   action: () => this.printDuplicate(),
        // },
      ],
    },
  ];

  card = signal<any | null>(null);

  // cards$ = this.mevService.findCards().pipe(
  //   tap((cards: any[]) => {
  //     if (cards?.length) {
  //       this.card.set(cards[0]);
  //     }
  //   })
  // );

  constructor(
    private translate: TranslateService,
    private mevService: MevService,
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
      addCircleOutline,
    });
  }

  ngAfterViewInit(): void {
    this.readRegistrations();
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
      '../modals/reports-modal/reports-modal.component'
    );
    const modal = await this.modalController.create({
      component: ReportsModalComponent,
      cssClass: 'reports-modal',
    });
    return await modal.present();
  }

  async openReceiptsModal() {
    const { ReceiptsModalComponent } = await import(
      '../modals/receipts-modal/receipts-modal.component'
    );
    const modal = await this.modalController.create({
      component: ReceiptsModalComponent,
      cssClass: 'receipts-modal',
    });
    return await modal.present();
  }

  async openMevCardModal() {
    const { MevCardModalComponent } = await import(
      '../modals/mev-card-modal/mev-card-modal.component'
    );
    const modal = await this.modalController.create({
      component: MevCardModalComponent,
      cssClass: 'mev-card-modal',
    });

    const result = await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'backdrop') {
      return;
    }

    if (data) {
      // Handle the form data here
      console.log('MEV Card data:', data);
      this.showSuccessMessage('Card MEV adăugat cu succes!');

      // You can process the data here, e.g., send to API
      // this.mevService.registerMevCard(data).subscribe(...)
    }
  }

  async openExportControlTapeModal() {
    const { ExportControlTapeModalComponent } = await import(
      '../modals/export-control-tape-modal/export-control-tape-modal.component'
    );
    const modal = await this.modalController.create({
      component: ExportControlTapeModalComponent,
      cssClass: 'export-control-tape-modal',
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
    this.warn(Utils.getErrorMessage(err), action);
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

  private async readRegistrations(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Căutare înregistrări MEV...',
    });

    loading.present();

    this.mevService
      .findCards()
      .pipe(finalize(() => loading.dismiss()))
      .subscribe((cards: any) => {
        console.log(cards);

        if (cards?.length) {
          this.card.set(cards[0]);
        } else {
          this.modalController
            .create({
              component: MevCardModalComponent,
              canDismiss: false,
            })
            .then((modal) => {
              modal.present();

              return modal.onDidDismiss();
            })
            .then((result) => {
              if (result.role == 'created' && result.data) {
                this.card.set(result.data);
              }
            });
        }
      });
  }
}
