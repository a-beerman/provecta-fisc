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
  receiptOutline,
  documentOutline,
  businessOutline,
  cardOutline,
  closeCircleOutline,
  copyOutline,
  cashOutline,
  giftOutline,
  addCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
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
export class ReceiptsPage implements OnInit {

  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  receiptActions = [
    {
      key: 'NEW_RECEIPT',
      icon: 'add-circle-outline',
      color: 'success',
      action: () => this.createNewReceipt()
    },
    {
      key: 'FISCAL_RECEIPT',
      icon: 'receipt-outline',
      color: 'primary',
      action: () => this.createFiscalReceipt()
    },
    {
      key: 'NON_FISCAL',
      icon: 'document-outline',
      color: 'medium',
      action: () => this.createNonFiscalReceipt()
    },
    {
      key: 'INVOICE',
      icon: 'business-outline',
      color: 'tertiary',
      action: () => this.createInvoice()
    },
    {
      key: 'CREDIT_NOTE',
      icon: 'document-outline',
      color: 'warning',
      action: () => this.createCreditNote()
    },
    {
      key: 'CANCEL_RECEIPT',
      icon: 'close-circle-outline',
      color: 'danger',
      action: () => this.cancelReceipt()
    },
    {
      key: 'DUPLICATE',
      icon: 'copy-outline',
      color: 'secondary',
      action: () => this.duplicateReceipt()
    },
    {
      key: 'CASH',
      icon: 'cash-outline',
      color: 'success',
      action: () => this.cashPayment()
    },
    {
      key: 'CARD',
      icon: 'card-outline',
      color: 'primary',
      action: () => this.cardPayment()
    },
    {
      key: 'VOUCHER',
      icon: 'gift-outline',
      color: 'tertiary',
      action: () => this.voucherPayment()
    }
  ];

  constructor(
    private translate: TranslateService, 
    private fiscalService: FiscalService, 
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    addIcons({
      receiptOutline,
      documentOutline,
      businessOutline,
      cardOutline,
      closeCircleOutline,
      copyOutline,
      cashOutline,
      giftOutline,
      addCircleOutline
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Translation service handles initialization only in browser
      this.translationService.getCurrentLanguage();
    }
  }

  createNewReceipt() {
    console.log('Creating new receipt');
    this.showSuccessMessage('Funcția Chitanță Nouă va fi implementată în curând');
  }

  createFiscalReceipt() {
    this.fiscalService.createFiscalReceipt([]).subscribe({
      next: (result) => {
        console.log('Fiscal receipt created:', result);
        this.showSuccessMessage(`Bon fiscal creat cu numărul: ${result.receiptNumber}`);
      },
      error: (error) => {
        console.error('Error creating fiscal receipt:', error);
        this.showErrorMessage('Eroare la crearea bonului fiscal');
      }
    });
  }

  createNonFiscalReceipt() {
    this.fiscalService.createNonFiscalReceipt('Non-fiscal receipt content').subscribe({
      next: (result) => {
        console.log('Non-fiscal receipt created:', result);
        this.showSuccessMessage('Bon non-fiscal creat cu succes');
      },
      error: (error) => {
        console.error('Error creating non-fiscal receipt:', error);
        this.showErrorMessage('Eroare la crearea bonului non-fiscal');
      }
    });
  }

  createInvoice() {
    this.fiscalService.createInvoice({}).subscribe({
      next: (result) => {
        console.log('Invoice created:', result);
        this.showSuccessMessage(`Factură creată cu numărul: ${result.invoiceNumber}`);
      },
      error: (error) => {
        console.error('Error creating invoice:', error);
        this.showErrorMessage('Eroare la crearea facturii');
      }
    });
  }

  createCreditNote() {
    this.fiscalService.createCreditNote({}).subscribe({
      next: (result) => {
        console.log('Credit note created:', result);
        this.showSuccessMessage(`Notă de credit creată cu numărul: ${result.creditNoteNumber}`);
      },
      error: (error) => {
        console.error('Error creating credit note:', error);
        this.showErrorMessage('Eroare la crearea notei de credit');
      }
    });
  }

  cancelReceipt() {
    this.fiscalService.cancelReceipt('123456').subscribe({
      next: (result) => {
        console.log('Receipt canceled:', result);
        this.showSuccessMessage('Bon anulat cu succes');
      },
      error: (error) => {
        console.error('Error canceling receipt:', error);
        this.showErrorMessage('Eroare la anularea bonului');
      }
    });
  }

  duplicateReceipt() {
    this.fiscalService.duplicateReceipt('123456').subscribe({
      next: (result) => {
        console.log('Receipt duplicated:', result);
        this.showSuccessMessage('Duplicat bon creat cu succes');
      },
      error: (error) => {
        console.error('Error duplicating receipt:', error);
        this.showErrorMessage('Eroare la crearea duplicatului');
      }
    });
  }

  cashPayment() {
    this.fiscalService.processPayment('cash', 100).subscribe({
      next: (result) => {
        console.log('Cash payment processed:', result);
        this.showSuccessMessage(`Plată numerar procesată. ID tranzacție: ${result.transactionId}`);
      },
      error: (error) => {
        console.error('Error processing cash payment:', error);
        this.showErrorMessage('Eroare la procesarea plății numerar');
      }
    });
  }

  cardPayment() {
    this.fiscalService.processPayment('card', 100).subscribe({
      next: (result) => {
        console.log('Card payment processed:', result);
        this.showSuccessMessage(`Plată card procesată. ID tranzacție: ${result.transactionId}`);
      },
      error: (error) => {
        console.error('Error processing card payment:', error);
        this.showErrorMessage('Eroare la procesarea plății cu cardul');
      }
    });
  }

  voucherPayment() {
    this.fiscalService.processPayment('voucher', 100).subscribe({
      next: (result) => {
        console.log('Voucher payment processed:', result);
        this.showSuccessMessage(`Plată voucher procesată. ID tranzacție: ${result.transactionId}`);
      },
      error: (error) => {
        console.error('Error processing voucher payment:', error);
        this.showErrorMessage('Eroare la procesarea plății cu voucher');
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
