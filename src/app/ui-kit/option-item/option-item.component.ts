import { searchResponse } from './../../../core/interfaces/shared.interfaces';
import { filter } from 'rxjs/operators';
import {
  Ingredients,
  priceItem,
} from './../../products/interfaces/products.interface';
import { BehaviorSubject } from 'rxjs';
import { IngredientsService } from 'src/core/services/ingredients.service';
import { NewProductDesktopComponent } from './../../products/new-product/new-product-desktop/new-product-desktop.component';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
interface optionItem {
  item: string;
  included: boolean;
  required: boolean;
  forOption: number;
}
interface priceOption {
  optionName: string;
  price: number;
  index: number;
}

@Component({
  selector: 'mbd-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss'],
})
export class OptionItemComponent implements OnInit {
  public unique_key: number;
  public parentRef: NewProductDesktopComponent;
  ingredients$ = new BehaviorSubject<Ingredients[]>(undefined);
  constructor(
    private ingredientsService: IngredientsService,
    private fb: FormBuilder
  ) {}
  form: FormGroup;

  optionName: string = '';
  price: number = 0;

  ngOnInit(): void {
    const checkArray: FormArray = this.form.get('price') as FormArray;
    checkArray.push(
      new FormControl(<priceOption>{
        optionName: '',
        price: 0,
        index: this.unique_key,
      })
    );

    this.ingredientsService
      .getAllIngredients()
      .subscribe((items: searchResponse<Ingredients>) => {
        this.ingredients$.next(items.items);
      });
  }

  remove_me() {
    // remove from product items
    let options: FormArray = this.form.get('price') as FormArray;
    options.removeAt(
      options.controls.findIndex(
        (x) => (<priceOption>x.value).index == this.unique_key
      )
    );
    // remove from options
    let checkArray: FormArray = this.form.get('bread') as FormArray;
    let toRemove = [];
    checkArray.getRawValue().map((x: optionItem, index) => {
      if (x.forOption === this.unique_key) {
        toRemove.push(index);
      }
    });
    toRemove = toRemove.reverse();
    toRemove.map((i) => {
      checkArray.removeAt(i);
    });

    checkArray = this.form.get('optional') as FormArray;
    toRemove = [];
    checkArray.getRawValue().map((x: optionItem, index) => {
      if (x.forOption === this.unique_key) {
        toRemove.push(index);
      }
    });
    toRemove = toRemove.reverse();
    toRemove.map((i) => {
      checkArray.removeAt(i);
    });

    checkArray = this.form.get('ingredients') as FormArray;
    toRemove = [];
    checkArray.getRawValue().map((x: optionItem, index) => {
      if (x.forOption === this.unique_key) {
        toRemove.push(index);
      }
    });
    toRemove = toRemove.reverse();
    toRemove.map((i) => {
      checkArray.removeAt(i);
    });

    console.log(this.form.value);
    this.parentRef.remove(this.unique_key);
  }

  onInputChange(e, field: string) {
    const checkArray: FormArray = this.form.get('price') as FormArray;
    //checkArray.controls.findIndex((x) => (<priceOption>x.value).index === this.unique_key)
    console.log(this.optionName);
    checkArray.controls.map((x) => {
      console.log(x.value);
      if ((<priceOption>x.value).index === this.unique_key) {
        x.value[field] = e.target.value;
        x.setValue(x.value);
        console.log(x.value);
      }
    });
  }

  onCheckboxChange(e, field: string) {
    const checkArray: FormArray = this.form.get(field) as FormArray;
    if (e.checked) {
      const item = <optionItem>{
        item: e.source.value,
        included: false,
        required: false,
        forOption: this.unique_key,
      };

      if (field === 'ingredients') {
        item.included = true;
        item.required = true;
      }

      checkArray.push(new FormControl(item));
    } else {
      checkArray.removeAt(
        checkArray.controls.findIndex(
          (x) => (<optionItem>x.value).item === e.source.value
        )
      );
    }
    console.log(this.form.value);
  }
}
