import { BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mbd-signup-mobile',
  templateUrl: './signup-mobile.component.html',
  styleUrls: ['./signup-mobile.component.scss'],
})
export class SignupMobileComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() error: string;
  @Output() formSubmit: EventEmitter<void> = new EventEmitter();
  isSmall: boolean;

  constructor(private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.observer.observe('(max-height: 670px)').subscribe((result) => {
      if (result.matches) {
        this.isSmall = true;
      } else {
        this.isSmall = false;
      }
    });
  }
}
