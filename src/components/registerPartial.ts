import Handlebars from "handlebars";
// TODO: создать index.ts файл с импортами
import AuthContainer from "../containers/AuthContainer";
import Button from "./Button";
import Form from "./Form";
import FormWrapper from "./FormWrapper";
import Input from "./Input";
import Spacer from "./Spacer";

export const registerPartial = () => {
  // components
  Handlebars.registerPartial("FormWrapper", FormWrapper);
  Handlebars.registerPartial("Form", Form);
  Handlebars.registerPartial("Button", Button);
  Handlebars.registerPartial("Input", Input);
  Handlebars.registerPartial("Spacer", Spacer);
  // containers
  Handlebars.registerPartial("AuthContainer", AuthContainer);
};
