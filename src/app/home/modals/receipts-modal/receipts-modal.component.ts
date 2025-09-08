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
import { FiscalService } from '../../../services/fiscal.service';
import { addIcons } from 'ionicons';
import {
  receiptOutline,
  cardOutline,
  cashOutline,
  copyOutline,
  pricetagOutline,
  printOutline,
  documentOutline,
  trashOutline,
  closeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-receipts-modal',
  templateUrl: './receipts-modal.component.html',
  styleUrls: ['./receipts-modal.component.scss'],
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
export class ReceiptsModalComponent implements OnInit {

  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  receiptActions = [
    {
      key: 'NEW_RECEIPT',
      title: 'Bon Nou',
      icon: 'receipt-outline',
      action: () => this.createNewReceipt()
    },
    {
      key: 'CANCEL_RECEIPT',
      title: 'Anulare Bon',
      icon: 'trash-outline',
      action: () => this.cancelReceipt()
    },
    {
      key: 'COPY_RECEIPT',
      title: 'Copie Bon',
      icon: 'copy-outline',
      action: () => this.copyReceipt()
    },
    {
      key: 'PAYMENT_CASH',
      title: 'Plată Numerar',
      icon: 'cash-outline',
      action: () => this.paymentCash()
    },
    {
      key: 'PAYMENT_CARD',
      title: 'Plată Card',
      icon: 'card-outline',
      action: () => this.paymentCard()
    },
    {
      key: 'DISCOUNT',
      title: 'Reducere',
      icon: 'pricetag-outline',
      action: () => this.applyDiscount()
    },
    {
      key: 'REPRINT_RECEIPT',
      title: 'Retipărire Bon',
      icon: 'print-outline',
      action: () => this.reprintReceipt()
    },
    {
      key: 'FISCAL_INFO',
      title: 'Info Fiscală',
      icon: 'document-outline',
      action: () => this.showFiscalInfo()
    }
  ];

  constructor(
    private modalController: ModalController,
    private fiscalService: FiscalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    addIcons({
      receiptOutline,
      cardOutline,
      cashOutline,
      copyOutline,
      pricetagOutline,
      printOutline,
      documentOutline,
      trashOutline,
      closeOutline
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Receipts modal initialized');
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  createNewReceipt() {
    this.fiscalService.createNewReceipt().subscribe({
      next: (receipt: any) => {
        this.showSuccessMessage('Bon fiscal nou a fost creat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la crearea bonului fiscal');
      }
    });
  }

  cancelReceipt() {
    this.fiscalService.cancelCurrentReceipt().subscribe({
      next: (result: any) => {
        this.showSuccessMessage('Bonul fiscal a fost anulat cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la anularea bonului fiscal');
      }
    });
  }

  copyReceipt() {
    this.fiscalService.copyLastReceipt().subscribe({
      next: (receipt: any) => {
        this.showSuccessMessage('Copia bonului fiscal a fost generată cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la generarea copiei bonului fiscal');
      }
    });
  }

  paymentCash() {
    const amount = 100; // This would typically come from user input
    this.fiscalService.processPayment(amount, 'CASH').subscribe({
      next: (result: any) => {
        this.showSuccessMessage('Plata în numerar a fost procesată cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la procesarea plății în numerar');
      }
    });
  }

  paymentCard() {
    const amount = 100; // This would typically come from user input
    this.fiscalService.processPayment(amount, 'CARD').subscribe({
      next: (result: any) => {
        this.showSuccessMessage('Plata cu cardul a fost procesată cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la procesarea plății cu cardul');
      }
    });
  }

  applyDiscount() {
    const discountPercent = 10; // This would typically come from user input
    this.fiscalService.applyDiscount(discountPercent).subscribe({
      next: (result: any) => {
        this.showSuccessMessage(`Reducerea de ${discountPercent}% a fost aplicată cu succes`);
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la aplicarea reducerii');
      }
    });
  }

  reprintReceipt() {
    this.fiscalService.reprintLastReceipt().subscribe({
      next: (result: any) => {
        this.showSuccessMessage('Bonul fiscal a fost retipărit cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la retipărirea bonului fiscal');
      }
    });
  }

  showFiscalInfo() {
    this.fiscalService.getFiscalInfo().subscribe({
      next: (info: any) => {
        this.showSuccessMessage('Informațiile fiscale au fost afișate cu succes');
      },
      error: (error: any) => {
        this.showErrorMessage('Eroare la afișarea informațiilor fiscale');
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
