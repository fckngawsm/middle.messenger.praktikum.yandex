export default `
<a id="{{id}}" class="link {{class}}" href="{{href}}">
    {{#if linkText}}
        {{linkText}}
    {{/if}}
    {{#if icon}}
        <img src="{{icon}}" alt="Иконка" class="link__icon"/>
    {{/if}}
</a>
`;
