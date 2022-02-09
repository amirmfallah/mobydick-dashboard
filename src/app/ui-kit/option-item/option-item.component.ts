import { element } from 'protractor';
import { EditProductDesktopComponent } from './../../products/edit-product/edit-product-desktop/edit-product-desktop.component';
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
import * as _ from 'lodash';
export interface optionItem {
  item: string;
  included: boolean;
  required: boolean;
  forOption: number;
}

export interface optionItemPopulated {
  item: Ingredients;
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
  public parentRef: NewProductDesktopComponent | EditProductDesktopComponent;
  ingredients$ = new BehaviorSubject<Ingredients[]>(undefined);
  constructor(
    private ingredientsService: IngredientsService,
    private fb: FormBuilder
  ) {}
  form: FormGroup;

  optionName: string = '';
  price: number = 0;
  item?: BehaviorSubject<priceItem>;
  optional?: BehaviorSubject<optionItemPopulated[]>;
  bread?: BehaviorSubject<optionItemPopulated[]>;
  ingredients?: BehaviorSubject<optionItemPopulated[]>;

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

        this.bread.subscribe((res: optionItemPopulated[]) => {
          res.forEach((element) => {
            this.onCheckboxChange(
              { checked: true, source: { value: element.item._id } },
              'bread'
            );
          });
        });
        this.optional.subscribe((res: optionItemPopulated[]) => {
          res.forEach((element) => {
            this.onCheckboxChange(
              { checked: true, source: { value: element.item._id } },
              'optional'
            );
          });
        });
        this.ingredients.subscribe((res: optionItemPopulated[]) => {
          console.log('here');
          console.log(res);
          res.forEach((element) => {
            this.onCheckboxChange(
              { checked: true, source: { value: element.item._id } },
              'ingredients'
            );
          });
        });
      });

    this.item.subscribe((item: priceItem) => {
      console.log(item);
      this.optionName = item.optionName;
      this.price = item.price;
      this.unique_key = item.index;
      const checkArray: FormArray = this.form.get('price') as FormArray;
      checkArray.controls.map((x) => {
        if ((<priceOption>x.value).index === this.unique_key) {
          x.value['price'] = item.price;
          x.value['optionName'] = item.optionName;
          x.value['index'] = item.index;
          x.setValue(x.value);
          console.log(x.value);
        }
      });
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

  isChecked(item: Ingredients, field: string) {
    if (field === 'bread') {
      return (
        this.bread.value.filter((x) => x.item._id === item._id)[0] !== undefined
      );
    } else if (field === 'optional') {
      return (
        this.optional.value.filter((x) => x.item._id === item._id)[0] !==
        undefined
      );
    } else if (field === 'ingredients') {
      return (
        this.ingredients.value.filter((x) => x.item._id === item._id)[0] !==
        undefined
      );
    }
  }
}
