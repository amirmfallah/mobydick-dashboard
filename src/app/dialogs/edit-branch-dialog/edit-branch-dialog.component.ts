import { BranchesService } from 'src/core/services/branches.service';
import { User } from './../../products/interfaces/branches.interface';
import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { branch } from 'src/app/products/interfaces/branches.interface';
import * as _ from 'lodash';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'mbd-edit-branch-dialog',
  templateUrl: './edit-branch-dialog.component.html',
  styleUrls: ['./edit-branch-dialog.component.scss'],
})
export class EditBranchDialogComponent implements OnInit {
  $branch = new BehaviorSubject<branch>(undefined);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private branchesService: BranchesService,
    public dialogRef: MatDialogRef<EditBranchDialogComponent>
  ) {
    this.$branch.subscribe((branch: branch) => {
      this.form = this.fb.group({
        address: [_.get(branch, 'address.address')],
        phone: [_.get(branch, 'address.phone')],
        lng: [_.get(branch, 'address.lng')],
        lat: [_.get(branch, 'address.lat')],
        description: [_.get(branch, 'description')],
        name: [_.get(branch, 'name')],
        thumbnail: [_.get(branch, 'thumbnail')],
      });
      console.log(this.form.value);
    });
  }

  ngOnInit(): void {}

  verifyBranch() {
    this.branchesService
      .patchBranchSuper({
        _id: this.$branch.value._id,
        verified: true,
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
