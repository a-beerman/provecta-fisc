import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton, 
  IonGrid, 
  IonRow, 
  IonCol 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-touch-input',
  templateUrl: './touch-input.component.html',
  styleUrls: ['./touch-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class TouchInputComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() value: string = '';
  @Input() clearValue: any = '0';
  @Input() maximum?: number;
  @Input() decimals = 0;
  @Input() anyValue?: boolean;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('hiddenInput') hiddenInput!: ElementRef<HTMLInputElement>;

  decimalSeparator = '.'; // CommonHelper.decimalSeparator;
  firstChanged: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hiddenInput?.nativeElement?.focus();
    }, 300);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value'].currentValue) {
      this.value = '';
      this.firstChanged = false;
    }
  }

  addValue(input: any) {
    if (!this.value || !this.firstChanged) {
      this.value = '';
      this.firstChanged = true;
    }

    if (this.anyValue) {
      this.value = this.value.toString() + input;
    } else {
      if (input === this.decimalSeparator) {
        if (this.value.toString().indexOf(this.decimalSeparator) >= 0) {
          return;
        }
      }

      if (this.decimals > 0) {
        const decimalIndex = this.value.toString().indexOf(this.decimalSeparator);
        if (decimalIndex >= 0 && this.value.length - decimalIndex > this.decimals) {
          return;
        }
      }

      if (this.maximum && this.maximum > 0) {
        const test = this.value + input;

        if (parseFloat(test) > this.maximum) {
          return;
        }
      }

      if (this.value === '0') {
        if (input === '0') {
          return;
        } else {
          this.value = input;
        }
      } else {
        this.value = this.value.toString() + input;
      }
    }

    // this.amount = Number(_amount);
    this.valueChange.emit(this.value);
  }

  clearAll() {
    this.value = this.clearValue;
    this.valueChange.emit(this.value);
  }

  onInputChange(e: KeyboardEvent) {
    if ((e.key >= '0' && e.key <= '9')|| e.key === this.decimalSeparator) {
      this.addValue(e.key);
    }
  }
}
