import { Block } from "@shared/blocks/Block";

export class ChatSelectDialog extends Block {
  protected render(): string {
    return ` 
        <div class="container__dialog">    
            <h2 class="chat__select-dialog">Выберите чат чтобы отправить сообщение</h2>
        </div>
      `;
  }
}
