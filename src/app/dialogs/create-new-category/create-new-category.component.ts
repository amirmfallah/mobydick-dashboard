import { switchMap } from 'rxjs/operators';
import { ImageUploadService } from './../../../core/services/imageUpload.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryItem } from 'src/app/categories/interfaces/categories.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mbd-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrls: ['./create-new-category.component.scss'],
})
export class CreateNewCategoryComponent implements OnInit {
  files: File[] = [];
  patch = false;
  form: FormGroup = this.fb.group({
    name: [''],
    thumbnail: [''],
  });
  preview = undefined;
  constructor(
    private imageService: ImageUploadService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<CreateNewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: CategoryItem
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.patch = true;
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['thumbnail'].setValue(this.data.thumbnail);
      this.preview = this.sanitizer.bypassSecurityTrustUrl(this.data.thumbnail);
    }
  }
  fileDropped(files: FileList): void {
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      this.files = [];
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        this.files.push(file);
        this.preview = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(file)
        );
        console.log(this.preview);
      }
    });
  }

  removeFile(index: number, e): void {
    this.files.splice(index, 1);
    this.preview = undefined;
    e.preventDefault();
  }

  upload() {
    this.form.disable();
    this.imageService
      .uploadImage(this.files[0])
      .pipe(
        switchMap((res: { Location: string; Key: string }) => {
          this.form.controls['thumbnail'].setValue(res.Location);
          return this.categoriesService.createNewCategory(this.form.value);
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.form.enable();
          this.dialogRef.close();
        },
        (err) => {
          this.form.enable();
        }
      );
  }

  patchCategory() {
    this.form.disable();
    of('')
      .pipe(
        switchMap(() => {
          if (this.files.length > 0) {
            return this.imageService.uploadImage(this.files[0]);
          }
          return of(undefined);
        }),
        switchMap((res: { Location: string; Key: string }) => {
          if (res) {
            this.form.controls['thumbnail'].setValue(res.Location);
          }
          return this.categoriesService.patchCategory(
            this.data._id,
            this.form.value
          );
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.form.enable();
          this.dialogRef.close();
        },
        (err) => {
          this.form.enable();
        }
      );
  }
}
