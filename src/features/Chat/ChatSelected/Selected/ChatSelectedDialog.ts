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
 `;
