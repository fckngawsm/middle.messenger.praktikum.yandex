export default `
    <div>
        <form class="form" id="{{id}}">
            {{> Input id="login" placeholder="Логин" name="login" label="Логин" type="text"}}
            {{> Input id="password" placeholder="Пароль" name="password" label="Пароль" type="password"}}
        </form>
    </div>
    {{> Button class="button" type="submit" form="login-form"}}
     {{> Button class="button button__type-link" type="submit" form="login-form"}}
`;
