import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  ModalController,
  LoadingController,
} from '@ionic/angular/standalone';
import { FiscalService } from '../../services/fiscal.service';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  statsChartOutline,
  calendarOutline,
  folderOutline,
  peopleOutline,
  libraryOutline,
  cashOutline,
  archiveOutline,
  closeOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { MevReceiptInfoComponent } from '../mev-receipt-info/mev-receipt-info.component';

@Component({
  selector: 'app-reports-modal',
  templateUrl: './reports-modal.component.html',
  styleUrls: ['./reports-modal.component.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonToast,
  ],
})
export class ReportsModalComponent implements OnInit {
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  reportActions = [
    {
      key: 'X_REPORT',
      title: 'Raport X',
      icon: 'document-text-outline',
      action: () => this.executeXReport(),
    },
    {
      key: 'Z_REPORT',
      title: 'Raport Z',
      icon: 'stats-chart-outline',
      action: () => this.executeZReport(),
    },
    {
      key: 'DAILY_REPORT',
      title: 'Raport Zilnic',
      icon: 'calendar-outline',
      action: () => this.executeDailyReport(),
    },
    {
      key: 'MONTHLY_REPORT',
      title: 'Raport Lunar',
      icon: 'calendar-outline',
      action: () => this.executeMonthlyReport(),
    },
    {
      key: 'FISCAL_MEMORY',
      title: 'Memorie Fiscală',
      icon: 'archive-outline',
      action: () => this.executeFiscalMemory(),
    },
    {
      key: 'JOURNAL',
      title: 'Jurnal ANAF',
      icon: 'folder-outline',
      action: () => this.executeJournal(),
    },
    {
      key: 'OPERATORS',
      title: 'Raport Operatori',
      icon: 'people-outline',
      action: () => this.executeOperatorsReport(),
    },
    {
      key: 'ARTICLES',
      title: 'Raport Articole',
      icon: 'library-outline',
      action: () => this.executeArticlesReport(),
    },
  ];

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private fiscalService: FiscalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    addIcons({
      documentTextOutline,
      statsChartOutline,
      calendarOutline,
      folderOutline,
      peopleOutline,
      libraryOutline,
      cashOutline,
      archiveOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Reports modal initialized');
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async executeXReport() {
    const loading = await this.loadingController.create({
      message: 'Generare Raport X...',
    });
    await loading.present();

    this.fiscalService
      .generateXReport()
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: (report: any) => {
          this.showMevReceiptInfo(report.response.text);
          // this.showSuccessMessage('Raportul X a fost generat cu succes');
        },
        error: (error: any) => {
          this.showErrorMessage('Eroare la generarea Raportului X');
        },
      });
  }

  executeZReport() {
    this.fiscalService.generateZReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul Z a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea Raportului Z');
      },
    });
  }

  executeDailyReport() {
    this.fiscalService.generateDailyReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul zilnic a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului zilnic');
      },
    });
  }

  executeMonthlyReport() {
    const currentDate = new Date();
    this.fiscalService
      .generateMonthlyReport(
        currentDate.getMonth() + 1,
        currentDate.getFullYear()
      )
      .subscribe({
        next: (report: any) => {
          this.showSuccessMessage('Raportul lunar a fost generat cu succes');
        },
        error: (error: any) => {
          this.showErrorMessage('Eroare la generarea raportului lunar');
        },
      });
  }

  executeFiscalMemory() {
    this.fiscalService.getFiscalMemory().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Memoria fiscală a fost citită cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la citirea memoriei fiscale');
      },
    });
  }

  executeJournal() {
    this.fiscalService.getJournal().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Jurnalul ANAF a fost citit cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la citirea jurnalului ANAF');
      },
    });
  }

  executeOperatorsReport() {
    this.fiscalService.getOperatorsReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage(
          'Raportul operatorilor a fost generat cu succes'
        );
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului operatorilor');
      },
    });
  }

  executeArticlesReport() {
    this.fiscalService.getArticlesReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage(
          'Raportul articolelor a fost generat cu succes'
        );
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului articolelor');
      },
    });
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
