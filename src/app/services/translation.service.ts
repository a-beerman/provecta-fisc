import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTranslations();
    }
  }

  private initializeTranslations() {
    // Set available languages
    this.translate.addLangs(['ro', 'en']);
    
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
