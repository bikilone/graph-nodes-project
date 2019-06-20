import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenIds: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenIds.indexOf(control.value) === -1 ? false : true;
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
