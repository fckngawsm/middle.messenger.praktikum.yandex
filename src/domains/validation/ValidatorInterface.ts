export interface Validator {
  validate(value: string, ...values: unknown[]): boolean;
}
