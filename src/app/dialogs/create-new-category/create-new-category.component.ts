import { switchMap } from 'rxjs/operators';
import { ImageUploadService } from './../../../core/services/imageUpload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mbd-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrls: ['./create-new-category.component.scss'],
})
export class CreateNewCategoryComponent implements OnInit {
  files: File[] = [];
  form: FormGroup = this.fb.group({
    name: [''],
    thumbnail: [''],
  });
  preview = undefined;
  constructor(
    private imageService: ImageUploadService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}
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
        },
        (err) => {
          this.form.enable();
        }
      );
  }
}
