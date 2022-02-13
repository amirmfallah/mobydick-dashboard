import { User } from './../../products/interfaces/branches.interface';
import { AuthService } from 'src/core/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';

@Component({
  selector: 'mbd-settings-desktop',
  templateUrl: './settings-desktop.component.html',
  styleUrls: ['./settings-desktop.component.scss'],
})
export class SettingsDesktopComponent implements OnInit {
  form = this.fb.group({
    firstname: [''],
    email: [''],
    password: [''],
    lastPassword: [''],
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((user: User) => {
      console.log(user);
      this.form.controls['firstname'].setValue(user.firstname);
      this.form.controls['email'].setValue(user.email);
    });
  }

  submit() {
    let values = this.form.value;
    if (
      !(
        this.form.controls['password'].value &&
        this.form.controls['lastPassword'].value
      )
    ) {
      delete values.password;
      delete values.lastPassword;
    }

    this.form.disable();
    this.authService.updateUserInfo(values).subscribe(
      (res) => {
        console.log(res);
        this.form.enable();
      },
      (err) => {
        this.form.enable();
      }
    );
  }
}
