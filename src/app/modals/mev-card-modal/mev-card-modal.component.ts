import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
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
  IonToast,
  IonList,
  ModalController,
  LoadingController,
  AlertController,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, saveOutline } from 'ionicons/icons';
import { MevService } from 'src/app/services/mev.service';
import { finalize } from 'rxjs';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-mev-card-modal',
  templateUrl: './mev-card-modal.component.html',
  styleUrls: ['./mev-card-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonToast,
    IonList,
    IonFooter,
  ],
})
export class MevCardModalComponent implements OnInit {
  mevCardForm!: FormGroup;
  showToast = false;
  toastMessage = '';
  toastColor: 'success' | 'danger' = 'success';

  // Form fields configuration
  formFields = [
    {
      key: 'factory',
      label: 'Fabricant',
      placeholder: 'FactoryNumber 1234',
      type: 'text',
    },
    { key: 'number', label: 'Număr', placeholder: 'Number 1234', type: 'text' },
    { key: 'model', label: 'Model', placeholder: 'Model 1234', type: 'text' },
    { key: 'idnx', label: 'IDNX', placeholder: 'Idnx 1234', type: 'text' },
    { key: 'name', label: 'Nume', placeholder: 'Name 1234', type: 'text' },
    {
      key: 'address',
      label: 'Adresă',
      placeholder: 'Address 1234',
      type: 'text',
    },
    {
      key: 'subdivision',
      label: 'Subdiviziune',
      placeholder: 'Subdivision 1234',
      type: 'text',
    },
    { key: 'point', label: 'Punct', placeholder: 'Point 1234', type: 'text' },
    { key: 'key', label: 'Cheie', placeholder: 'Key 1234', type: 'text' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private mevService: MevService
  ) {
    addIcons({ closeOutline, saveOutline });
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    const formControls: any = {};

    this.formFields.forEach((field) => {
      formControls[field.key] = ['', Validators.required];
    });

    this.mevCardForm = this.formBuilder.group(formControls);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async saveMevCard() {
    if (this.mevCardForm.valid) {
      const formValue = this.mevCardForm.value;

      // Convert keys to lowercase as requested
      const result: any = {};
      Object.keys(formValue).forEach((key) => {
        result[key.toLowerCase()] = formValue[key];
      });

      const loading = await this.loadingController.create({
        message: 'Se creează card MEV...',
      });
      await loading.present();

      this.mevService
        .createCard(result)
        .pipe(finalize(() => loading.dismiss()))
        .subscribe({
          next: (response) => {
            console.log('Card MEV creat cu succes!', response);
            this.modalController.dismiss(result, 'created');
          },
          error: (error) => {
            this.showErrorMessage(
              Utils.getErrorMessage(error) || 'Eroare la crearea cardului MEV'
            );
          },
        });
    } else {
      this.showErrorMessage('Toate câmpurile sunt obligatorii');
    }
  }

  private showErrorMessage(message: string) {
    this.alertController
      .create({
        header: 'Eroare',
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.mevCardForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.mevCardForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return 'Acest câmp este obligatoriu';
      }
    }
    return '';
  }
}
