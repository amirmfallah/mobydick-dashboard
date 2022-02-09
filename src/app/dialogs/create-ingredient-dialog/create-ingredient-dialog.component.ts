import { IngredientsService } from 'src/core/services/ingredients.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
  constructor(
    private fb: FormBuilder,
    private ingredientsService: IngredientsService,
    private dialogRef: MatDialogRef<CreateIngredientDialogComponent>
  ) {}

  ngOnInit(): void {}

  create() {
    if (!this.form.valid) {
      return;
    }
    this.form.disable();
    this.ingredientsService.createIngredients(this.form.value).subscribe(() => {
      this.form.enable();
      this.dialogRef.close();
    });
  }
}
