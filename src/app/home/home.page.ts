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
  ModalController
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { FiscalService } from '../services/fiscal.service';
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
  cloudDownloadOutline
} from 'ionicons/icons';

interface AppCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action: () => void;
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
    IonToast
  ]
})
export class HomePage implements OnInit {

  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  appCards: AppCard[] = [
    {
      id: 'reports',
      title: 'Rapoarte Fiscale',
      subtitle: 'X, Z, Zilnice, Lunare',
      icon: 'stats-chart-outline',
      color: 'primary',
      action: () => this.openReportsModal()
    },
    {
      id: 'receipts',
      title: 'Funcții Chitanțe',
      subtitle: 'Bonuri, Facturi, Plăți',
      icon: 'receipt-outline',
      color: 'secondary',
      action: () => this.openReceiptsModal()
    },
    {
      id: 'fiscal-memory',
      title: 'Memorie Fiscală',
      subtitle: 'Citire și export',
      icon: 'archive-outline',
      color: 'tertiary',
      action: () => this.readFiscalMemory()
    },
    {
      id: 'operators',
      title: 'Operatori',
      subtitle: 'Gestionare utilizatori',
      icon: 'people-outline',
      color: 'success',
      action: () => this.manageOperators()
    },
    {
      id: 'articles',
      title: 'Articole',
      subtitle: 'Produse și servicii',
      icon: 'business-outline',
      color: 'warning',
      action: () => this.manageArticles()
    },
    {
      id: 'cash-operations',
      title: 'Operații Casa',
      subtitle: 'Intrări și ieșiri',
      icon: 'cash-outline',
      color: 'medium',
      action: () => this.cashOperations()
    },
    {
      id: 'payments',
      title: 'Tipuri Plată',
      subtitle: 'Numerar, Card, Voucher',
      icon: 'card-outline',
      color: 'primary',
      action: () => this.managePayments()
    },
    {
      id: 'printing',
      title: 'Imprimante',
      subtitle: 'Configurare și testare',
      icon: 'print-outline',
      color: 'danger',
      action: () => this.managePrinting()
    },
    {
      id: 'calculator',
      title: 'Calculator Fiscal',
      subtitle: 'Calcule și verificări',
      icon: 'calculator-outline',
      color: 'secondary',
      action: () => this.openCalculator()
    },
    {
      id: 'sync',
      title: 'Sincronizare',
      subtitle: 'Backup și restore',
      icon: 'cloud-download-outline',
      color: 'success',
      action: () => this.syncData()
    },
    {
      id: 'settings',
      title: 'Setări Sistem',
      subtitle: 'Configurare generală',
      icon: 'settings-outline',
      color: 'dark',
      action: () => this.openSettings()
    }
  ];

  constructor(
    private translate: TranslateService,
    private fiscalService: FiscalService,
    private translationService: TranslationService,
    private modalController: ModalController,
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
      cloudDownloadOutline
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Home page initialized');
    }
  }

  trackByCardId(index: number, card: AppCard): string {
    return card.id;
  }

  async openReportsModal() {
    const { ReportsModalComponent } = await import('./modals/reports-modal/reports-modal.component');
    const modal = await this.modalController.create({
      component: ReportsModalComponent,
      cssClass: 'reports-modal'
    });
    return await modal.present();
  }

  async openReceiptsModal() {
    const { ReceiptsModalComponent } = await import('./modals/receipts-modal/receipts-modal.component');
    const modal = await this.modalController.create({
      component: ReceiptsModalComponent,
      cssClass: 'receipts-modal'
    });
    return await modal.present();
  }

  readFiscalMemory() {
    this.fiscalService.getFiscalMemory().subscribe({
      next: (report: any) => {
        this.showSuccessMessage('Memoria fiscală a fost citită cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la citirea memoriei fiscale');
      }
    });
  }

  manageOperators() {
    this.showInfoMessage('Funcția Operatori va fi implementată în curând');
  }

  manageArticles() {
    this.showInfoMessage('Funcția Articole va fi implementată în curând');
  }

  cashOperations() {
    this.fiscalService.getCashInOut().subscribe({
      next: (result: any) => {
        this.showSuccessMessage('Operații casa executate cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la executarea operațiilor casa');
      }
    });
  }

  managePayments() {
    this.showInfoMessage('Funcția Tipuri Plată va fi implementată în curând');
  }

  managePrinting() {
    this.showInfoMessage('Funcția Imprimante va fi implementată în curând');
  }

  openCalculator() {
    this.showInfoMessage('Calculator Fiscal va fi implementat în curând');
  }

  syncData() {
    this.showInfoMessage('Funcția Sincronizare va fi implementată în curând');
  }

  openSettings() {
    this.showInfoMessage('Funcția Setări va fi implementată în curând');
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
}
