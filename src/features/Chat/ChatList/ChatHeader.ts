export default `
<div class="chat__header">    
    {{#> Link id="chat-link" class="chat__header-link" href="/settings" linkText="Профиль"}}
        <img src="{{icon}}" alt="Иконка" class="chat__icon"/>
    {{/Link}}
    {{> ChatInput id="chat-input" placeholder="Поиск" name="сhat-search"}}
</div>
`;
