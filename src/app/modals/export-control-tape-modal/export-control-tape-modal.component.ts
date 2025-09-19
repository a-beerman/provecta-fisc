import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonDatetime,
  IonToast,
  LoadingController,
  ModalController,
  IonFooter,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeOutline, cloudDownloadOutline } from 'ionicons/icons';
import { MevService } from '../../services/mev.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-export-control-tape-modal',
  templateUrl: './export-control-tape-modal.component.html',
  styleUrls: ['./export-control-tape-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonDatetime,
    IonToast,
    IonFooter,
    IonCol,
    IonRow,
    IonGrid,
  ],
})
export class ExportControlTapeModalComponent implements OnInit {
  dateFrom: string = new Date().toISOString();
  dateTo: string = new Date().toISOString();
  showToast = false;
  toastMessage = '';
  toastColor: 'success' | 'danger' | 'warning' = 'success';

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private mevService: MevService,
    public translate: TranslateService,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    addIcons({ closeOutline, cloudDownloadOutline });
  }

  ngOnInit() {
    // Set default date range (last 30 days to today)
    // const today = new Date();
    // const thirtyDaysAgo = new Date();
    // thirtyDaysAgo.setDate(today.getDate() - 30);
    // this.dateFrom = thirtyDaysAgo.toISOString();
    // this.dateTo = today.toISOString();
  }

  onFromDateChange(event: any) {
    this.dateFrom = event.detail.value;
  }

  onToDateChange(event: any) {
    this.dateTo = event.detail.value;
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async downloadControlTape() {
    if (!this.dateFrom || !this.dateTo) {
      this.showErrorMessage('Vă rugăm să selectați perioada');
      return;
    }

    const fromDate = new Date(this.dateFrom);
    const toDate = new Date(this.dateTo);

    if (fromDate > toDate) {
      this.showErrorMessage(
        'Data de început nu poate fi mai mare decât data de sfârșit'
      );
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Se descarcă banda de control...',
    });
    await loading.present();

    try {
      const fromDateFormatted = `${this.dateFrom.split('T')[0]}T00:00:00.000`;
      const toDateFormatted = `${this.dateTo.split('T')[0]}T23:59:59.999`;

      this.mevService
        .getReceiptsByPeriod(fromDateFormatted, toDateFormatted)
        .subscribe({
          next: (blob: Blob) => {
            this.downloadFile(
              blob,
              `control-tape-${fromDateFormatted}-${toDateFormatted}.txt`
            );
            this.showSuccessMessage(
              'Banda de control a fost descărcată cu succes'
            );
            loading.dismiss();
          },
          error: (error) => {
            console.error('Error downloading control tape:', error);
            this.showErrorMessage('Eroare la descărcarea benzii de control');
            loading.dismiss();
          },
        });
    } catch (error) {
      console.error('Error:', error);
      this.showErrorMessage('Eroare la descărcarea benzii de control');
      loading.dismiss();
    }
  }

  private formatDateForAPI(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
