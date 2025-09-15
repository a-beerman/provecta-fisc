import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private roTranslations = {
    "APP": {
      "TITLE": "ProvectaFisc",
      "MENU": {
        "REPORTS": "Rapoarte",
        "RECEIPTS": "Chitanțe",
        "SETTINGS": "Setări"
      }
    },
    "REPORTS": {
      "TITLE": "Rapoarte",
      "X_REPORT": "Raport X",
      "Z_REPORT": "Raport Z",
      "DAILY_REPORT": "Raport Zilnic",
      "MONTHLY_REPORT": "Raport Lunar",
      "FISCAL_MEMORY": "Memorie Fiscală",
      "JOURNAL": "Jurnal ANAF",
      "OPERATORS": "Raport Operatori",
      "ARTICLES": "Raport Articole",
      "DEPARTMENTS": "Raport Departamente",
      "CASH_IN_OUT": "Intrări/Ieșiri Casa"
    },
    "RECEIPTS": {
      "TITLE": "Funcții Chitanțe",
      "NEW_RECEIPT": "Chitanță Nouă",
      "FISCAL_RECEIPT": "Bon Fiscal",
      "NON_FISCAL": "Non-Fiscal",
      "INVOICE": "Factură",
      "CREDIT_NOTE": "Notă de Credit",
      "CANCEL_RECEIPT": "Anulare Bon",
      "DUPLICATE": "Duplicat",
      "PAYMENT": "Plată",
      "CASH": "Numerar",
      "CARD": "Card",
      "VOUCHER": "Voucher"
    },
    "COMMON": {
      "EXECUTE": "Execută",
      "CANCEL": "Anulează",
      "SAVE": "Salvează",
      "DELETE": "Șterge",
      "EDIT": "Editează",
      "VIEW": "Vizualizează",
      "PRINT": "Tipărește",
      "EXPORT": "Exportă",
      "SEARCH": "Caută",
      "REFRESH": "Reîmprospătează",
      "LOADING": "Se încarcă...",
      "ERROR": "Eroare",
      "SUCCESS": "Succes",
      "WARNING": "Avertisment",
      "INFO": "Informație"
    },
    "FROM_DATE": "Data De La",
    "TO_DATE": "Data Până La",
    "SELECT_VALID_PERIOD": "Selectează o perioadă validă",
    "EXPORT_CONTROL_TAPE": {
      "TITLE": "Export Bandă Control",
      "PERIOD_LABEL": "Perioada",
      "DOWNLOAD_BUTTON": "Descarcă Banda de Control"
    }
  };

  private enTranslations = {
    "APP": {
      "TITLE": "ProvectaFisc",
      "MENU": {
        "REPORTS": "Reports",
        "RECEIPTS": "Receipts",
        "SETTINGS": "Settings"
      }
    },
    "REPORTS": {
      "TITLE": "Reports",
      "X_REPORT": "X Report",
      "Z_REPORT": "Z Report",
      "DAILY_REPORT": "Daily Report",
      "MONTHLY_REPORT": "Monthly Report",
      "FISCAL_MEMORY": "Fiscal Memory",
      "JOURNAL": "ANAF Journal",
      "OPERATORS": "Operators Report",
      "ARTICLES": "Articles Report",
      "DEPARTMENTS": "Departments Report",
      "CASH_IN_OUT": "Cash In/Out"
    },
    "RECEIPTS": {
      "TITLE": "Receipt Functions",
      "NEW_RECEIPT": "New Receipt",
      "FISCAL_RECEIPT": "Fiscal Receipt",
      "NON_FISCAL": "Non-Fiscal",
      "INVOICE": "Invoice",
      "CREDIT_NOTE": "Credit Note",
      "CANCEL_RECEIPT": "Cancel Receipt",
      "DUPLICATE": "Duplicate",
      "PAYMENT": "Payment",
      "CASH": "Cash",
      "CARD": "Card",
      "VOUCHER": "Voucher"
    },
    "COMMON": {
      "EXECUTE": "Execute",
      "CANCEL": "Cancel",
      "SAVE": "Save",
      "DELETE": "Delete",
      "EDIT": "Edit",
      "VIEW": "View",
      "PRINT": "Print",
      "EXPORT": "Export",
      "SEARCH": "Search",
      "REFRESH": "Refresh",
      "LOADING": "Loading...",
      "ERROR": "Error",
      "SUCCESS": "Success",
      "WARNING": "Warning",
      "INFO": "Information"
    },
    "FROM_DATE": "From Date",
    "TO_DATE": "To Date",
    "SELECT_VALID_PERIOD": "Select a valid period",
    "EXPORT_CONTROL_TAPE": {
      "TITLE": "Export Control Tape",
      "PERIOD_LABEL": "Period",
      "DOWNLOAD_BUTTON": "Download Control Tape"
    }
  };

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTranslations();
    }
  }

  private initializeTranslations() {
    // Set translations
    this.translate.setTranslation('ro', this.roTranslations);
    this.translate.setTranslation('en', this.enTranslations);
    
    // Set default language
    this.translate.setDefaultLang('ro');
    this.translate.use('ro');
  }

  switchLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'ro';
  }
}
