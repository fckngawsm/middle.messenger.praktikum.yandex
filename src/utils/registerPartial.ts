import Handlebars from "handlebars";
// TODO: создать index.ts файл с импортами
import Avatar from "../shared/components/Avatar/Avatar";
import Button from "../shared/components/Button";
import ChatHeader from "../shared/components/Chat/ChatHeader";
import ChatItem from "../shared/components/Chat/ChatItem";
import ChatList from "../shared/components/Chat/ChatList";
import Form from "../shared/components/Form/Form";
import FormWrapper from "../shared/components/FormWrapper";
import ChatInput from "../shared/components/Inputs/ChatInput";
import Input from "../shared/components/Inputs/Input";
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
  Handlebars.registerPartial("ChatInput", ChatInput);
  Handlebars.registerPartial("Spacer", Spacer);
  Handlebars.registerPartial("Link", Link);
  Handlebars.registerPartial("ChatList", ChatList);
  Handlebars.registerPartial("ChatHeader", ChatHeader);
  Handlebars.registerPartial("ChatItem", ChatItem);
  Handlebars.registerPartial("Avatar", Avatar);
  // containers
  Handlebars.registerPartial("AuthContainer", AuthContainer);
  Handlebars.registerPartial("ErrorContainer", ErrorContainer);
  Handlebars.registerPartial("ChatsContainer", ChatsContainer);
};
