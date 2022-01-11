import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewStaffComponent } from 'src/app/dialogs/create-new-staff/create-new-staff.component';

@Component({
  selector: 'mbd-staff-desktop',
  templateUrl: './staff-desktop.component.html',
  styleUrls: ['./staff-desktop.component.scss'],
})
export class StaffDesktopComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openNewStaffDialog(): void {
    const dialogRef = this.dialog.open(CreateNewStaffComponent);
  }
}
