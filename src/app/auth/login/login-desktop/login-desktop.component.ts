import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mbd-login-desktop',
  templateUrl: './login-desktop.component.html',
  styleUrls: ['./login-desktop.component.scss'],
})
export class LoginDesktopComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() error: string;
  @Output() formSubmit: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
