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
  ModalController
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
  closeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-reports-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Rapoarte Fiscale</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          @for (report of reportActions; track report.key) {
            <ion-col size="12" size-md="6">
              <ion-card button="true" (click)="report.action()">
                <ion-card-header>
                  <ion-card-title class="card-title">
                    <ion-icon [name]="report.icon" class="card-icon"></ion-icon>
                    <span>{{ report.title }}</span>
                  </ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-button expand="block" fill="clear" color="primary">
                    Execută
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </ion-col>
          }
        </ion-row>
      </ion-grid>

      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="3000"
        [color]="toastColor"
        (didDismiss)="showToast = false">
      </ion-toast>
    </ion-content>
  `,
  styles: [`
    .card-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .card-icon {
      font-size: 1.5rem;
      color: var(--ion-color-primary);
    }

    ion-card {
      margin: 8px;
      border-radius: 12px;
      transition: transform 0.2s ease;
    }

    ion-card:hover {
      transform: translateY(-2px);
    }
  `],
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
    IonToast
  ]
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
      action: () => this.executeXReport()
    },
    {
      key: 'Z_REPORT',
      title: 'Raport Z',
      icon: 'stats-chart-outline',
      action: () => this.executeZReport()
    },
    {
      key: 'DAILY_REPORT',
      title: 'Raport Zilnic',
      icon: 'calendar-outline',
      action: () => this.executeDailyReport()
    },
    {
      key: 'MONTHLY_REPORT',
      title: 'Raport Lunar',
      icon: 'calendar-outline',
      action: () => this.executeMonthlyReport()
    },
    {
      key: 'FISCAL_MEMORY',
      title: 'Memorie Fiscală',
      icon: 'archive-outline',
      action: () => this.executeFiscalMemory()
    },
    {
      key: 'JOURNAL',
      title: 'Jurnal ANAF',
      icon: 'folder-outline',
      action: () => this.executeJournal()
    },
    {
      key: 'OPERATORS',
      title: 'Raport Operatori',
      icon: 'people-outline',
      action: () => this.executeOperatorsReport()
    },
    {
      key: 'ARTICLES',
      title: 'Raport Articole',
      icon: 'library-outline',
      action: () => this.executeArticlesReport()
    }
  ];

  constructor(
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
      closeOutline
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

  executeXReport() {
    this.fiscalService.generateXReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul X a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea Raportului X');
      }
    });
  }

  executeZReport() {
    this.fiscalService.generateZReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul Z a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea Raportului Z');
      }
    });
  }

  executeDailyReport() {
    this.fiscalService.generateDailyReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul zilnic a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului zilnic');
      }
    });
  }

  executeMonthlyReport() {
    const currentDate = new Date();
    this.fiscalService.generateMonthlyReport(currentDate.getMonth() + 1, currentDate.getFullYear()).subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul lunar a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului lunar');
      }
    });
  }

  executeFiscalMemory() {
    this.fiscalService.getFiscalMemory().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Memoria fiscală a fost citită cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la citirea memoriei fiscale');
      }
    });
  }

  executeJournal() {
    this.fiscalService.getJournal().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Jurnalul ANAF a fost citit cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la citirea jurnalului ANAF');
      }
    });
  }

  executeOperatorsReport() {
    this.fiscalService.getOperatorsReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul operatorilor a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului operatorilor');
      }
    });
  }

  executeArticlesReport() {
    this.fiscalService.getArticlesReport().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Raportul articolelor a fost generat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea raportului articolelor');
      }
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
}
