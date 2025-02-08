import Handlebars from "handlebars";
// TODO: создать index.ts файл с импортами
import ChatHeader from "../features/Chat/ChatHeader";
import ChatItem from "../features/Chat/ChatItem";
import ChatList from "../features/Chat/ChatList";
import ChatSelectDialog from "../features/Chat/ChatSelectDialog";
import ProfileNavigationButton from "../features/Profile/ProfileNavigationButton";
import Avatar from "../shared/components/Avatar/Avatar";
import Button from "../shared/components/Buttons/Button";
import RoundButton from "../shared/components/Buttons/RoundButton";
import Form from "../shared/components/Form/Form";
import FormWrapper from "../shared/components/FormWrapper";
import ChatInput from "../shared/components/Inputs/ChatInput";
import Input from "../shared/components/Inputs/Input";
import Link from "../shared/components/Link";
import Spacer from "../shared/components/Spacer";
import AuthContainer from "../shared/containers/AuthContainer";
import ChatsContainer from "../shared/containers/ChatsContainer";
import ErrorContainer from "../shared/containers/ErrorContainer";
import ProfileContainer from "../shared/containers/ProfileContainer";

export const registerPartial = () => {
  // components
  Handlebars.registerPartial("FormWrapper", FormWrapper);
  Handlebars.registerPartial("Form", Form);
  Handlebars.registerPartial("Button", Button);
  Handlebars.registerPartial("RoundButton", RoundButton);
  Handlebars.registerPartial("Input", Input);
  Handlebars.registerPartial("ChatInput", ChatInput);
  Handlebars.registerPartial("Spacer", Spacer);
  Handlebars.registerPartial("Link", Link);
  Handlebars.registerPartial("ChatList", ChatList);
  Handlebars.registerPartial("ChatHeader", ChatHeader);
  Handlebars.registerPartial("ChatItem", ChatItem);
  Handlebars.registerPartial("Avatar", Avatar);
  Handlebars.registerPartial("ChatSelectDialog", ChatSelectDialog);
  Handlebars.registerPartial(
    "ProfileNavigationButton",
    ProfileNavigationButton
  );
  // containers
  Handlebars.registerPartial("AuthContainer", AuthContainer);
  Handlebars.registerPartial("ErrorContainer", ErrorContainer);
  Handlebars.registerPartial("ChatsContainer", ChatsContainer);
  Handlebars.registerPartial("ProfileContainer", ProfileContainer);
};
