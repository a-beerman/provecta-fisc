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
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonMenuButton,
  IonButtons,
  IonToast
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { FiscalService } from '../services/fiscal.service';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  statsChartOutline,
  calendarOutline,
  folderOutline,
  peopleOutline,
  libraryOutline,
  cashOutline,
  archiveOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
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
    IonCardContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonMenuButton,
    IonButtons,
    IonToast
  ]
})
export class ReportsPage implements OnInit {

  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  reportActions = [
    {
      key: 'X_REPORT',
      icon: 'document-text-outline',
      action: () => this.executeXReport()
    },
    {
      key: 'Z_REPORT',
      icon: 'stats-chart-outline',
      action: () => this.executeZReport()
    },
    {
      key: 'DAILY_REPORT',
      icon: 'calendar-outline',
      action: () => this.executeDailyReport()
    },
    {
      key: 'MONTHLY_REPORT',
      icon: 'calendar-outline',
      action: () => this.executeMonthlyReport()
    },
    {
      key: 'FISCAL_MEMORY',
      icon: 'archive-outline',
      action: () => this.executeFiscalMemory()
    },
    {
      key: 'JOURNAL',
      icon: 'folder-outline',
      action: () => this.executeJournal()
    },
    {
      key: 'OPERATORS',
      icon: 'people-outline',
      action: () => this.executeOperatorsReport()
    },
    {
      key: 'ARTICLES',
      icon: 'library-outline',
      action: () => this.executeArticlesReport()
    },
    {
      key: 'DEPARTMENTS',
      icon: 'library-outline',
      action: () => this.executeDepartmentsReport()
    },
    {
      key: 'CASH_IN_OUT',
      icon: 'cash-outline',
      action: () => this.executeCashInOut()
    }
  ];

  constructor(
    private translate: TranslateService, 
    private fiscalService: FiscalService, 
    private translationService: TranslationService,
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
      archiveOutline
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Translation service handles initialization only in browser
      this.translationService.getCurrentLanguage();
    }
  }

  executeXReport() {
    this.fiscalService.generateXReport().subscribe({
      next: (report) => {
        console.log('X Report generated:', report);
        this.showSuccessMessage('Raportul X a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating X Report:', error);
        this.showErrorMessage('Eroare la generarea Raportului X');
      }
    });
  }

  executeZReport() {
    this.fiscalService.generateZReport().subscribe({
      next: (report) => {
        console.log('Z Report generated:', report);
        this.showSuccessMessage('Raportul Z a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating Z Report:', error);
        this.showErrorMessage('Eroare la generarea Raportului Z');
      }
    });
  }

  executeDailyReport() {
    this.fiscalService.generateDailyReport().subscribe({
      next: (report) => {
        console.log('Daily Report generated:', report);
        this.showSuccessMessage('Raportul zilnic a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating Daily Report:', error);
        this.showErrorMessage('Eroare la generarea raportului zilnic');
      }
    });
  }

  executeMonthlyReport() {
    const currentDate = new Date();
    this.fiscalService.generateMonthlyReport(currentDate.getMonth() + 1, currentDate.getFullYear()).subscribe({
      next: (report) => {
        console.log('Monthly Report generated:', report);
        this.showSuccessMessage('Raportul lunar a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating Monthly Report:', error);
        this.showErrorMessage('Eroare la generarea raportului lunar');
      }
    });
  }

  executeFiscalMemory() {
    this.fiscalService.getFiscalMemory().subscribe({
      next: (report) => {
        console.log('Fiscal Memory read:', report);
        this.showSuccessMessage('Memoria fiscală a fost citită cu succes');
      },
      error: (error) => {
        console.error('Error reading Fiscal Memory:', error);
        this.showErrorMessage('Eroare la citirea memoriei fiscale');
      }
    });
  }

  executeJournal() {
    this.fiscalService.getJournal().subscribe({
      next: (report) => {
        console.log('Journal read:', report);
        this.showSuccessMessage('Jurnalul ANAF a fost citit cu succes');
      },
      error: (error) => {
        console.error('Error reading Journal:', error);
        this.showErrorMessage('Eroare la citirea jurnalului ANAF');
      }
    });
  }

  executeOperatorsReport() {
    this.fiscalService.getOperatorsReport().subscribe({
      next: (report) => {
        console.log('Operators Report generated:', report);
        this.showSuccessMessage('Raportul operatorilor a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating Operators Report:', error);
        this.showErrorMessage('Eroare la generarea raportului operatorilor');
      }
    });
  }

  executeArticlesReport() {
    this.fiscalService.getArticlesReport().subscribe({
      next: (report) => {
        console.log('Articles Report generated:', report);
        this.showSuccessMessage('Raportul articolelor a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating Articles Report:', error);
        this.showErrorMessage('Eroare la generarea raportului articolelor');
      }
    });
  }

  executeDepartmentsReport() {
    this.fiscalService.getDepartmentsReport().subscribe({
      next: (report) => {
        console.log('Departments Report generated:', report);
        this.showSuccessMessage('Raportul departamentelor a fost generat cu succes');
      },
      error: (error) => {
        console.error('Error generating Departments Report:', error);
        this.showErrorMessage('Eroare la generarea raportului departamentelor');
      }
    });
  }

  executeCashInOut() {
    this.fiscalService.getCashInOut().subscribe({
      next: (report) => {
        console.log('Cash In/Out executed:', report);
        this.showSuccessMessage('Intrări/Ieșiri casa executate cu succes');
      },
      error: (error) => {
        console.error('Error executing Cash In/Out:', error);
        this.showErrorMessage('Eroare la executarea intrări/ieșiri casa');
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
