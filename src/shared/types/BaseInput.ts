export interface BaseInputAttributes {
  id?: string | number;
  groupClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  type?: HTMLInputElement["type"];
  name?: string;
  required?: boolean;
  formId?: string;
}
