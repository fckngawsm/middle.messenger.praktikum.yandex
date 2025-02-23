export default `
    {{> ChatSelectedHeader name="Кирилл"}}
    {{#> MessageList}}
        {{#each messages}}
            {{> MessageItem 
                message=this.message 
                date=this.date 
                check=this.check
                isMyMessage=this.isMyMessage
            }}
        {{/each}}
    {{/MessageList}}
    {{> Spacer}}
    <div class="chat__bottom-part">
        <img class="chat__attach-icon" src="{{attach}}" alt="Прикрепить"/>
        {{> ChatInput id="chat-input" placeholder="Сообщение" name="message"}}
        {{> RoundButton id="chat-link" icon=submitIcon}}
    </div>
`;
