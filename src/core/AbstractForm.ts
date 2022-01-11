import { FormGroup } from '@angular/forms';
import { Configuration } from './configuration';

export abstract class AbstractForm<T> {
  public create = true;
  public item: T;
  public abstract form: FormGroup;
  public defaultDateFormat = Configuration.dateFormat;
  private disabledFields: string[] = [];
  public abstract onSubmit(formValue: T): void;
  public disableForm(): void {
    this.disabledFields = Object.keys(this.form.controls).filter((key) => {
      return this.form.controls[key].disabled;
    });
    this.form.disable();
  }
  public enableForm(): void {
    this.form.enable();
    this.disabledFields.forEach((key) => {
      this.form.controls[key].disable();
    });
  }
}
