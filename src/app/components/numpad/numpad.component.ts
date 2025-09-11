import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TouchInputComponent } from '../touch-input/touch-input.component';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TouchInputComponent,
    IonicModule,
  ],
})
export class NumpadComponent implements OnInit {
  @Input() result: string = '';
  @Input() decimals = 0;
  @Input() maximum?: number;
  @Input() title?: string;
  @Input() secured?: boolean;
  @Input() clearValue = '0';

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.canApply) {
      this.apply();
    }
  }

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  public get securedResult(): string {
    if (!this.result) {
      return '';
    }

    return new Array(this.result.length).fill('*').join('').replace(',', '');
  }

  apply() {
    this.modalCtrl.dismiss(this.result, 'ok');
  }

  public get canApply(): boolean {
    return !!(this.result && this.result.length && this.result !== '.');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
