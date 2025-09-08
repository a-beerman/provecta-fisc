import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';
import { MevService } from './services/mev.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    IonApp,
    IonRouterOutlet,
  ],
})
export class AppComponent implements OnInit {

  constructor(
    private mevService: MevService, 
    private translate: TranslateService, 
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.mevService.findCards().subscribe((cards: any) => {
        console.log(cards);

        if (cards?.length) {
          const card = cards[0];
          const mevCard = {
            ...card,
            endpoint: 'https://provectadevices.com:3100',
          };
          // CommonHelper.setSettingsValue(AppSettings.UNIT, 'MevCard', mevCard);
        }
      });
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Translation service will initialize automatically in browser
      console.log('App initialized with language:', this.translationService.getCurrentLanguage());
    }
  }
}
