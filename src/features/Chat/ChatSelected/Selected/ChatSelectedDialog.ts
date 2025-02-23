export default `
    {{#> MessageList}}
        {{#each messages}}
        {{log messages}}
            {{> MessageItem 
                message=this.message 
                date=this.date 
                check=this.check
                isMyMessage=this.isMyMessage
            }}
        {{/each}}
    {{/MessageList}}
 `;
