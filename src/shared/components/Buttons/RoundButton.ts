export default `
<button id="{{id}}" class="button__type-round" type="{{type}}" form="{{form}}">{{text}}
    {{#if icon}}
        <img src="{{icon}}" alt="Иконка" class="link__icon"/>
    {{/if}}
</button>
`;
