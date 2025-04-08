import { ChatApi } from "@api/chats/chats.controller";
import { UserApi } from "@api/user/user.controller";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Input } from "@shared/components/Inputs/Input";
import { Chat } from "@shared/types/Chat";

interface ChatSelectedHeaderContentProps {
  onClose: () => void;
  onDeleteChat: () => void;
}

export class ChatSelectedHeaderContent extends Block {
  constructor(props: ChatSelectedHeaderContentProps) {
    super({
      ...props,
      Input: new Input({
        attr: {
          inputClassName: "input",
          placeholder: "Введите логин пользователя",
          name: "input-add-user",
        },
        events: {
          input: (event: Event) => {
            const target = event.target as HTMLInputElement;
            this.setProps({ inputValue: target.value });
          },
        },
      }),
      Button: new Button({
        attr: {
          className: "button button-full-width",
        },
        text: "Добавить",
        onClick: () => {
          this.addUserToChat();
        },
      }),
      DeleteChat: new Button({
        attr: {
          className: "button link red button-full-width",
        },
        text: "Удалить и покинуть чат",
        onClick: () => {
          props.onDeleteChat();
        },
      }),
    });
  }

  private addUserToChat = async () => {
    const { chat } = store.getState();

    try {
      const inputValue = this.props.inputValue as string;

      const foundedUser = await UserApi.getUserByLogin(inputValue);
      const foundedUserIds = JSON.parse(foundedUser.response).map(
        ({ id }: { id: number }) => id
      );

      await ChatApi.addUserToChat({
        users: foundedUserIds,
        chatId: (chat as Chat).id,
      });

      this.setProps({ inputValue: "" });
      this.children.Input.setProps({ value: "" });
      this.props.onClose();
    } catch (error) {
      console.error("Ошибка при добавлении пользователя:", error);
    }
  };

  protected render(): string {
    return `
      <form class="form add-user-form" id="add-user-form">
        {{{Input}}}
        {{{Button}}}
        {{{DeleteChat}}}
      </form>
    `;
  }
}
