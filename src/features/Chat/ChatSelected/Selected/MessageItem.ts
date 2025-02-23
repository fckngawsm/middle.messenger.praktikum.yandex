export default `
    <li class="message__item {{class}}">
        <p class="message__text">
            {{message}}
            <span class="message__time">
                {{#if isMyMessage}}
                    <img class="message__check" src="{{check}}" />
                {{/if}}
                {{date}}
            </span>
        </p>
    </li>
`;
