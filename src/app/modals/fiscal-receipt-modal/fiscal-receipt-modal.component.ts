import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  IonText,
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  addOutline,
  removeOutline,
  saveOutline,
  trashOutline,
  receiptOutline,
  mailOutline,
} from 'ionicons/icons';
import {
  MevReceipt,
  MevService,
  PaymentType,
} from '../../services/mev.service';
import { TranslationService } from '../../services/translation.service';
import { catchError, finalize } from 'rxjs';
import { Utils } from 'src/app/services/utils';

interface Product {
  name: string;
  price: number;
  quantity: number;
  taxPercent: number | null;
  taxCode: string;
}

interface Payment {
  type: PaymentType;
  deposit: number;
}

interface ReceiptDataWithEmail {
  email?: string;
  total?: string;
  idns?: string;
  payments: {
    field: Array<{
      type: string;
      deposit: string;
    }>;
  };
}

@Component({
  selector: 'app-fiscal-receipt-modal',
  templateUrl: './fiscal-receipt-modal.component.html',
  styleUrls: ['./fiscal-receipt-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonToast,
    IonText,
  ],
})
export class FiscalReceiptModalComponent implements OnInit {
  receiptForm!: FormGroup;
  showToast = false;
  toastMessage = '';
  toastColor: 'success' | 'danger' | 'warning' = 'success';

  // Tax options (Romanian VAT rates)
  taxOptions = [
    { code: 'A', percent: 20 },
    { code: 'B', percent: 8 },
    { code: 'C', percent: 5 },
    { code: 'D', percent: 0 },
    { code: 'E', percent: null }, // Exempt
  ];

  // Payment type options
  paymentTypes = [
    { value: PaymentType.Cash, label: 'FISCAL_RECEIPT.PAYMENT_CASH' },
    { value: PaymentType.Card, label: 'FISCAL_RECEIPT.PAYMENT_CARD' },
    { value: PaymentType.Vaucher, label: 'FISCAL_RECEIPT.PAYMENT_VOUCHER' },
    { value: PaymentType.Check, label: 'FISCAL_RECEIPT.PAYMENT_CHECK' },
  ];

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private mevService: MevService,
    private translate: TranslateService,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    addIcons({
      closeOutline,
      addOutline,
      removeOutline,
      saveOutline,
      trashOutline,
      receiptOutline,
      mailOutline,
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.receiptForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      products: this.formBuilder.array([]),
      payments: this.formBuilder.array([]),
    });

    // Add initial product and payment
    this.addProduct();
    this.addPayment();
  }

  // Product management
  get products(): FormArray {
    return this.receiptForm.get('products') as FormArray;
  }

  addProduct() {
    const productGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      taxPercent: [20], // Remove required validator since it can be null for exempt tax
      taxCode: ['A', [Validators.required]],
    });

    this.products.push(productGroup);
  }

  removeProduct(index: number) {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  onTaxChange(index: number, taxCode: string) {
    const tax = this.taxOptions.find((t) => t.code === taxCode);
    if (tax) {
      this.products.at(index).patchValue({
        taxCode: taxCode,
        taxPercent: tax.percent,
      });
    }
  }

  getProductTotal(index: number): number {
    const product = this.products.at(index).value;
    return product.price * product.quantity;
  }

  // Payment management
  get payments(): FormArray {
    return this.receiptForm.get('payments') as FormArray;
  }

  addPayment() {
    const paymentGroup = this.formBuilder.group({
      type: [PaymentType.Cash, [Validators.required]],
      deposit: [0, [Validators.required, Validators.min(0.01)]],
    });

    this.payments.push(paymentGroup);
  }

  removePayment(index: number) {
    if (this.payments.length > 1) {
      this.payments.removeAt(index);
    }
  }

  // Calculations
  getTotalAmount(): number {
    let total = 0;
    for (let i = 0; i < this.products.length; i++) {
      total += this.getProductTotal(i);
    }
    return total;
  }

  getTotalPayments(): number {
    let total = 0;
    this.payments.controls.forEach((payment) => {
      total += payment.value.deposit || 0;
    });
    return total;
  }

  getTotalTax(): number {
    let tax = 0;
    this.products.controls.forEach((product) => {
      const productValue = product.value;
      const subtotal = productValue.price * productValue.quantity;
      // Handle null tax percentage (exempt products)
      const taxPercent = productValue.taxPercent ?? 0;
      tax += (subtotal * taxPercent) / 100;
    });
    return tax;
  }

  getDifference(): number {
    const diff = this.getTotalPayments() - this.getTotalAmount();
    return Math.abs(diff) < 0.01 ? 0 : diff;
  }

  // Validation
  isFormValid(): boolean {
    const hasValidEmail = this.receiptForm.get('email')?.valid || false;
    const hasValidProducts = this.products.valid && this.products.length > 0;
    const hasValidPayments = this.payments.valid && this.payments.length > 0;
    const paymentsMatchTotal = this.getTotalPayments() >= this.getTotalAmount();
    // Math.abs(this.getTotalPayments() - this.getTotalAmount()) < 0.01;

    return (
      hasValidEmail &&
      hasValidProducts &&
      hasValidPayments &&
      paymentsMatchTotal
    );
  }

  getValidationMessage(fieldName?: string): string {
    if (fieldName === 'email' && !this.receiptForm.get('email')?.valid) {
      const emailControl = this.receiptForm.get('email');
      if (emailControl?.errors?.['required']) {
        return 'FISCAL_RECEIPT.VALIDATION_EMAIL_REQUIRED';
      }
      if (emailControl?.errors?.['email']) {
        return 'FISCAL_RECEIPT.VALIDATION_EMAIL_FORMAT';
      }
    }
    if (!this.receiptForm.get('email')?.valid) {
      return 'FISCAL_RECEIPT.VALIDATION_EMAIL';
    }
    if (!this.products.valid) {
      return 'FISCAL_RECEIPT.VALIDATION_PRODUCTS';
    }
    if (!this.payments.valid) {
      return 'FISCAL_RECEIPT.VALIDATION_PAYMENTS';
    }
    // if (Math.abs(this.getTotalPayments() - this.getTotalAmount()) >= 0.01) {
    //   return 'FISCAL_RECEIPT.VALIDATION_PAYMENT_MISMATCH';
    // }
    return '';
  }

  // Actions
  dismissModal() {
    this.modalController.dismiss();
  }

  // async saveDraft() {
  //   // TODO: Implement save draft functionality
  //   this.showToastMessage('FISCAL_RECEIPT.DRAFT_SAVED', 'success');
  // }

  async createReceipt() {
    if (!this.isFormValid()) {
      this.showToastMessage(this.getValidationMessage(), 'warning');
      return;
    }

    //  {"code":"4b8feaa9-fd77-3e0e-2494-cdf899642753","data":{"payments":[{"type":"1","deposit":12.5}]},"activities":[{"name":"999999","amount":1,"price":12.5,"tax":{"code":"B","percent":8}}],"device":{"instanceId":"7cbc91c1-9cdc-7833-f29f-da9b93651fd5"}}
    const receiptData: Partial<MevReceipt> = {
      activities: this.products.value.map((p: any) => ({
        name: p.name,
        amount: p.quantity,
        price: p.price,
        tax: {
          code: p.taxCode,
          percent: p.taxPercent,
        },
      })),
      client: {
        address: this.receiptForm.get('email')?.value || '',
      },
      data: {
        payments: this.payments.value.map((p: any) => ({
          type: p.type,
          deposit: p.deposit,
        })),
      },
    };

    // Email field is now sent as client.address in the MEV receipt

    const loading = await this.loadingController.create({
      message: this.translate.instant('FISCAL_RECEIPT.RECEIPT_CREATING'),
    });
    await loading.present();

    this.mevService
      .addFiscalReceipt(receiptData as MevReceipt)
      .pipe(
        catchError((error) => {
          const errorMsg = Utils.getErrorMessage(error);
          this.showToastMessage(errorMsg, 'danger');
          throw error;
        }),
        finalize(() => loading.dismiss())
      )
      .subscribe((result) => {
        this.modalController.dismiss(result, 'created');
      });

    // TODO: Implement actual receipt creation
    // this.showToastMessage('FISCAL_RECEIPT.RECEIPT_CREATED', 'success');
  }

  private showToastMessage(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    this.toastMessage = message;
    this.toastColor = color;
    this.showToast = true;
  }
}
