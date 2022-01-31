import { Router } from '@angular/router';
import { CategoriesService } from './../../../categories/services/categories.service';
import { Category } from './../../interfaces/products.interface';
import { OptionItemComponent } from './../../../ui-kit/option-item/option-item.component';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { delay, switchMap } from 'rxjs/operators';
import { ImageUploadService } from 'src/core/services/imageUpload.service';
import { BehaviorSubject, of } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mbd-new-product-desktop',
  templateUrl: './new-product-desktop.component.html',
  styleUrls: ['./new-product-desktop.component.scss'],
})
export class NewProductDesktopComponent implements OnInit {
  files: File[] = [];

  preview = undefined;
  @ViewChild('options', { read: ViewContainerRef }) container: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<OptionItemComponent>>();
  categories$ = new BehaviorSubject<Category>(undefined);
  constructor(
    private fb: FormBuilder,
    private imageService: ImageUploadService,
    private sanitizer: DomSanitizer,
    private _cfr: ComponentFactoryResolver,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    thumbnail: [''],
    description: ['', Validators.required],
    available: ['', Validators.required],
    category: ['', Validators.required],
    bread: this.fb.array([]),
    optional: this.fb.array([]),
    ingredients: this.fb.array([]),
    price: this.fb.array([], Validators.required),
  });
  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((x) => {
      console.log(x);
      this.categories$.next(x);
    });
    of('')
      .pipe(delay(100))
      .subscribe(() => {
        this.addOption();
      });
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
    e.preventDefault();
  }

  upload() {
    this.form.disable();
  }

  addOption() {
    let componentFactory =
      this._cfr.resolveComponentFactory(OptionItemComponent);

    let childComponentRef = this.container.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    childComponent.form = this.form;
    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  remove(key: number) {
    if (this.container.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      (x) => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.componentsReferences.indexOf(
      componentRef as any
    );

    // removing component from container
    this.container.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.unique_key !== key
    );
  }

  onCategoryChange(e) {
    console.log(e);
    this.form.controls['category'].setValue(e);
  }

  submit() {
    console.log(this.files.length);
    this.form.controls['available'].setValue(true);
    if (!this.form.valid || this.files.length <= 0) {
      this._snackBar.open('فیلد‌های الزامی را تکمیل کنید.', 'باشه', {
        duration: 2000,
        panelClass: ['snakbar'],
      });
      return;
    }
    this.form.disable();
    this.imageService
      .uploadImage(this.files[0])
      .pipe(
        switchMap((res: { Location: string; Key: string }) => {
          this.form.controls['thumbnail'].setValue(res.Location);
          return this.productService.createProduct(this.form.value);
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this._snackBar.open('محصول با موفقیت ساخته شد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
          this.form.enable();
          this.router.navigate(['/', 'products']);
        },
        (err) => {
          this.form.enable();
          this._snackBar.open('در هنگام ساخت محصول مشکلی پیش آمد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
        }
      );
  }
}
