export default `
    <li class="message__item {{class}}">
        <p class="message__text">
            {{message}}
            {{#if isMyMessage}}
                <img class="message__check" src="{{check}}" />
            {{/if}}
            <span class="message__time">{{date}}</span>
        </p>
    </li>
`;
