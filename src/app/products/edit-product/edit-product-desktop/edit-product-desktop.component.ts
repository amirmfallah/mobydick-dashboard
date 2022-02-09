import { Ingredients } from 'src/app/products/interfaces/products.interface';
import {
  optionItem,
  optionItemPopulated,
} from './../../../ui-kit/option-item/option-item.component';
import { element } from 'protractor';
import { ImageUploadService } from './../../../../core/services/imageUpload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  Category,
  productsResponse,
  Product,
  priceItem,
} from './../../interfaces/products.interface';
import { searchResponse } from './../../../../core/interfaces/shared.interfaces';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { delay, switchMap, tap, map, filter } from 'rxjs/operators';
import { OptionItemComponent } from 'src/app/ui-kit/option-item/option-item.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'mbd-edit-product-desktop',
  templateUrl: './edit-product-desktop.component.html',
  styleUrls: ['./edit-product-desktop.component.scss'],
})
export class EditProductDesktopComponent implements OnInit {
  files: File[] = [];

  preview = undefined;
  @ViewChild('options', { read: ViewContainerRef }) container: ViewContainerRef;
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<OptionItemComponent>>();
  categories$ = new BehaviorSubject<Category[]>(undefined);
  constructor(
    private fb: FormBuilder,
    private imageService: ImageUploadService,
    private sanitizer: DomSanitizer,
    private _cfr: ComponentFactoryResolver,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
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
  productId;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    of('')
      .pipe(
        switchMap(() => this.categoriesService.getAllCategories()),
        map((res) => this.categories$.next(res.items)),
        switchMap(() => this.productService.getProduct(this.productId))
      )
      .subscribe((res: Product) => {
        this.form.controls['name'].setValue(res.name);
        this.form.controls['thumbnail'].setValue(res.thumbnail);
        this.preview = res.thumbnail;
        this.form.controls['description'].setValue(res.description);
        this.form.controls['available'].setValue(res.available);
        this.form.controls['category'].setValue(res.category);
        res.price.forEach((element) => {
          const bread = res.bread.filter((x) => x.forOption == element.index);
          const optional = res.optional.filter(
            (x) => x.forOption == element.index
          );
          const ingredients = res.ingredients.filter(
            (x) => x.forOption == element.index
          );

          this.populatePrice(element, bread, optional, ingredients);
          this.child_unique_key = element.index + 1;
        });
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
    this.preview = undefined;
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

  populatePrice(item: priceItem, bread, optional, ingredients) {
    let componentFactory =
      this._cfr.resolveComponentFactory(OptionItemComponent);

    componentFactory.inputs;
    let childComponentRef = this.container.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = item.index;
    childComponent.parentRef = this;
    childComponent.form = this.form;
    childComponent.item = new BehaviorSubject<priceItem>(item);
    childComponent.bread = new BehaviorSubject<optionItemPopulated[]>(bread);
    childComponent.optional = new BehaviorSubject<optionItemPopulated[]>(
      optional
    );
    childComponent.ingredients = new BehaviorSubject<optionItemPopulated[]>(
      ingredients
    );

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
    console.log(this.form.value);
    this.form.controls['available'].setValue(true);
    console.log(this.form.errors);
    if (!this.form.valid) {
      this._snackBar.open('فیلد‌های الزامی را تکمیل کنید.', 'باشه', {
        duration: 2000,
        panelClass: ['snakbar'],
      });
      return;
    }
    this.form.disable();
    of('')
      .pipe(
        switchMap(() => {
          if (this.files.length > 0) {
            return this.imageService.uploadImage(this.files[0]);
          } else {
            return of(undefined);
          }
        }),
        switchMap((res: { Location: string; Key: string }) => {
          if (res) {
            this.form.controls['thumbnail'].setValue(res.Location);
          }
          return this.productService.patchProduct(
            this.productId,
            this.form.value
          );
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
          console.log(err);
          this.form.enable();
          this._snackBar.open('در هنگام ساخت محصول مشکلی پیش آمد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
        }
      );
  }
}
