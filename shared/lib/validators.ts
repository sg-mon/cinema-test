export function loginValidator(value: string): boolean {
  if (value.length < 8) {
    return false;
  }
  return true;
}
export function passwordValidator(value: string): boolean {
  if (value.length < 8 || !/[A-ZА-Я]/g.test(value) || !/\d/.test(value)) {
    return false;
  }
  return true;
}
