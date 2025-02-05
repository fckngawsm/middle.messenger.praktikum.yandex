import Handlebars from "handlebars";

import LoginFormWrapper from "../templates/auth/Login/FormWrapper";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

export const registerPartial = () => {
  Handlebars.registerPartial("LoginFormWrapper", LoginFormWrapper);
  Handlebars.registerPartial("Form", Form);
  Handlebars.registerPartial("Button", Button);
  Handlebars.registerPartial("Input", Input);
};
