export default `
    <div class="chat__selected-header">
        <div>
            {{> Avatar class="selected-user__avatar"}}
            <h2 class="chat__selected-header-name">{{name}}</h2>
        </div>
        <img class="chat__selected-header-dots" src="{{dots}}" alt="Точки"/>
    </div>
`;
