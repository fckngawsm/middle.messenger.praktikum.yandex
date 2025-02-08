export default `
    <div class="profile__navigation">
        {{#> RoundButton id="chat-link" class="chat__header-link" href="/settings" linkText="Профиль"}}
            <img src="{{icon}}" alt="Иконка"/>
        {{/RoundButton}}
    </div>
`;
