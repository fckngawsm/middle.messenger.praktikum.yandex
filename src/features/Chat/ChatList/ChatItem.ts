export default `
    <div class="chat__item">  
        {{> Avatar class="chat__avatar" src="{{userAvatar}}" }}
        <div class="chat__info">
            <div class="chat__info-user">
                <h2 class="chat__user-name">{{userName}}</h2>
                <h3 class="chat__last-message">{{lastMessage}}</h3>
            </div>
            <div class="chat__info-additional">
                <h4 class="chat__time">{{lastMessageTime}}</h4>
                {{#if unreadMessageCount}}
                    <h5 class="chat__unread-message-count">{{unreadMessageCount}}</h5>
                {{/if}}
            </div>
        </div>
    </div>
`;
