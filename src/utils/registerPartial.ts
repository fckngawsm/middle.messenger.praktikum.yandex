import Handlebars from "handlebars";
import ChatHeader from "../features/Chat/ChatParticipants/ChatHeader";
import ChatItem from "../features/Chat/ChatParticipants/ChatParticipantItem";
import ChatList from "../features/Chat/ChatParticipants/ChatParticipantList";
import ChatSelectDialog from "../features/Chat/ChatSelected/Select/ChatSelectDialog";
import ChatSelectedDialog from "../features/Chat/ChatSelected/Selected/ChatSelectedDialog";
import ChatSelectedHeader from "../features/Chat/ChatSelected/Selected/ChatSelectedHeader";
import MessageItem from "../features/Chat/ChatSelected/Selected/MessageItem";
import MessageList from "../features/Chat/ChatSelected/Selected/MessageList";
import ProfileNavigationButton from "../features/Profile/ProfileNavigationButton";
import ProfileSettings from "../features/Profile/ProfileSettings";
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
import SelectedChatContainer from "../shared/containers/SelectedChatContainer";

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
  // chat
  Handlebars.registerPartial("ChatList", ChatList);
  Handlebars.registerPartial("ChatHeader", ChatHeader);
  Handlebars.registerPartial("ChatSelectDialog", ChatSelectDialog);
  Handlebars.registerPartial("ChatSelectedDialog", ChatSelectedDialog);
  Handlebars.registerPartial("ChatSelectedHeader", ChatSelectedHeader);
  Handlebars.registerPartial("MessageList", MessageList);
  Handlebars.registerPartial("MessageItem", MessageItem);
  //
  Handlebars.registerPartial("ChatItem", ChatItem);
  Handlebars.registerPartial("Avatar", Avatar);
  Handlebars.registerPartial(
    "ProfileNavigationButton",
    ProfileNavigationButton
  );
  Handlebars.registerPartial("ProfileSettings", ProfileSettings);
  // containers
  Handlebars.registerPartial("AuthContainer", AuthContainer);
  Handlebars.registerPartial("ErrorContainer", ErrorContainer);
  Handlebars.registerPartial("ChatsContainer", ChatsContainer);
  Handlebars.registerPartial("ProfileContainer", ProfileContainer);
  Handlebars.registerPartial("SelectedChatContainer", SelectedChatContainer);
};
