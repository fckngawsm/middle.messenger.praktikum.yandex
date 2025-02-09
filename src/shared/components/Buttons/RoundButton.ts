export default `
    <a id="{{id}}" href="{{href}}" class="button__type-round">
        {{#if linkText}}
            {{linkText}}
        {{/if}}
        {{#if icon}}
            <img src="{{icon}}" alt="Иконка" class="link__icon"/>
        {{/if}}
    </a>
`;
