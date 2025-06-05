import {AbstractControl, ValidationErrors} from '@angular/forms';


export function createIngredientsValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const ingredients = control.value as string;
    const ingredientsArray = ingredients.split(' ');

    const errors: ValidationErrors = {};

    const insufficientLength = ingredientsArray.length < 3;
    if (insufficientLength) {
      errors['insufficientLength'] = true;
    }

    const hasDuplicates = new Set(ingredientsArray).size !== ingredientsArray.length;
    if (hasDuplicates) {
      errors['hasDuplicates'] = true;
    }

    const hasPineapple = ingredientsArray.includes('pineapple');
    if (hasPineapple) {
      errors['hasPineapple'] = true;
    }

    const hasSpecialChars = /[!@#$%^&*()_+]/.test(ingredients);
    if (hasSpecialChars) {
      errors['hasSpecialChars'] = true;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    return null;
  };
}
