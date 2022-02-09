import { CreateIngredient } from './../../../core/interfaces/shared.interfaces';
import { IngredientsService } from 'src/core/services/ingredients.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
@Component({
  selector: 'mbd-create-ingredient-dialog',
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrls: ['./create-ingredient-dialog.component.scss'],
})
export class CreateIngredientDialogComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
  });
  patch = false;
  constructor(
    private fb: FormBuilder,
    private ingredientsService: IngredientsService,
    private dialogRef: MatDialogRef<CreateIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: CreateIngredient
  ) {
    if (_.get(data, '_id')) {
      this.patch = true;
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['price'].setValue(this.data.price);
    }
  }

  ngOnInit(): void {}

  create() {
    if (!this.form.valid) {
      return;
    }
    this.form.disable();
    if (this.patch) {
      this.ingredientsService
        .patchIngredients(this.data._id, this.form.value)
        .subscribe(() => {
          this.form.enable();
          this.dialogRef.close();
        });
    } else {
      this.ingredientsService
        .createIngredients(this.form.value)
        .subscribe(() => {
          this.form.enable();
          this.dialogRef.close();
        });
    }
  }
}
