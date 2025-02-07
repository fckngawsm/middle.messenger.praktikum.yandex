import Handlebars from "handlebars";
// TODO: создать index.ts файл с импортами
import Button from "../shared/components/Button";
import Form from "../shared/components/Form";
import FormWrapper from "../shared/components/FormWrapper";
import Input from "../shared/components/Input";
import Link from "../shared/components/Link";
import Spacer from "../shared/components/Spacer";
import AuthContainer from "../shared/containers/AuthContainer";
import ChatsContainer from "../shared/containers/ChatsContainer";
import ErrorContainer from "../shared/containers/ErrorContainer";

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
