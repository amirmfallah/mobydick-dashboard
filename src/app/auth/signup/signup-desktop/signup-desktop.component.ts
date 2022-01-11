import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mbd-signup-desktop',
  templateUrl: './signup-desktop.component.html',
  styleUrls: ['./signup-desktop.component.scss'],
})
export class SignupDesktopComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() error: string;
  @Output() formSubmit: EventEmitter<void> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
}
