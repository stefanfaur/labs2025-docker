import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {createIngredientsValidator} from './ingredients.validator';

@Directive({
  selector: '[appIngredientsValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IngredientsValidatorDirective,
    multi: true
  }]
})
export class IngredientsValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return createIngredientsValidator()(control);
  }
}
