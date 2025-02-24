export default `
    <div class="form__input-group {{groupClass}}">
        <input class="form__input {{inputClass}}" placeholder="{{placeholder}}" type="{{type}}" id="{{id}}" name="{{name}}" required="{{required}}">
        {{#if label}}
            <label class="form__label" for="{{id}}">{{label}}</label>
        {{/if}}
        {{#if helperText}}
            <p class="form__helper-text">{{helperText}}</p>
        {{/if}}
    </div>
`;
