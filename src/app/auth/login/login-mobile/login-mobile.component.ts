import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mbd-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss'],
})
export class LoginMobileComponent implements OnInit {
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
