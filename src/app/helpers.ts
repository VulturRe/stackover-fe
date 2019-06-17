import { FormGroup } from '@angular/forms';

export class Helpers {
  static setControlsIfNull(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.controls[controlName];
      if (control.value === null) {
        control.setValue('');
      }
    });
  }

  static getError(formGroup: FormGroup, controlName: string) {
    const errors = formGroup.controls[controlName].errors;
    if (errors.email) return 'Неверный формат e-mail';
    if (errors.required) return 'Обязательное поле';
    if (errors.minLength) return `Минимальная длина ${errors.minLength.min} ${Helpers.getPlural(errors.minLength.min)}`;
    if (errors.notEquivalent) return `Пароли не совпадают`;
  }

  private static getPlural(count: number) {
    if (count === 1) return 'символ';
    if (count === 2 || count === 3 || count === 4) return 'символа';
    if (count > 20) {
      const str = count.toString();
      const lastDigit = parseInt(str[str.length - 1], 10);
      if (lastDigit === 1) return 'символ';
      if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) return 'символа';
    }
    return 'символов';
  }
}
