import Handlebars from "handlebars";
// TODO: создать index.ts файл с импортами
import AuthContainer from "../containers/AuthContainer";
import ChatsContainer from "../containers/ChatsContainer";
import ErrorContainer from "../containers/ErrorContainer";
import Button from "./Button";
import Form from "./Form";
import FormWrapper from "./FormWrapper";
import Input from "./Input";
import Link from "./Link";
import Spacer from "./Spacer";

export const registerPartial = () => {
  // components
  Handlebars.registerPartial("FormWrapper", FormWrapper);
  Handlebars.registerPartial("Form", Form);
  Handlebars.registerPartial("Button", Button);
  Handlebars.registerPartial("Input", Input);
  Handlebars.registerPartial("Spacer", Spacer);
  Handlebars.registerPartial("Link", Link);
  // containers
  Handlebars.registerPartial("AuthContainer", AuthContainer);
  Handlebars.registerPartial("ErrorContainer", ErrorContainer);
  Handlebars.registerPartial("ChatsContainer", ChatsContainer);
};
