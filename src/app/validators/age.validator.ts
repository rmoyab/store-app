import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as dateFns from 'date-fns';

export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const birthday = dateFns.parse(control.value, 'yyyy-MM-dd', new Date());

    if (!dateFns.isValid(birthday)) {
      return { invalidDate: { value: control.value } };
    }

    const age = dateFns.differenceInYears(new Date(), birthday);

    return age >= minAge
      ? null
      : { minAge: { requiredAge: minAge, actualAge: age } };
  };
}
