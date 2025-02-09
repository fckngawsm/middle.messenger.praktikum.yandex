export default `
  <div class="profile__wrapper">
    {{#> Form id="settings-form"}}
      <div class="profile__settings">
        <div class="profile__settings-fields">
          <p class="profile__settings-field">Аватар</p>
          {{> Input 
            inputClass="form__input-setting" 
            groupClass="form__input-group-settings" 
            id="profile-avatar" 
            type="text" 
            name="avatar" 
            placeholder="Аватарка" 
            required="true" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Имя</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-first_name" 
            type="text" 
            name="first_name" 
            required="true" 
            placeholder="Ваше имя" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Фамилия</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-second_name" 
            type="text" 
            name="second_name" 
            required="true" 
            placeholder="Фамилия" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Имя в чате</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-display_name" 
            type="text" 
            name="display_name" 
            required="true" 
            placeholder="Имя в чате" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Логин</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-login" 
            type="email" 
            name="text" 
            required="true" 
            placeholder="Укажите логин" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Почта</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-email" 
            type="email" 
            name="email" 
            required="true" 
            placeholder="Укажите почту" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Телефон</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-phone" 
            type="tel" 
            name="phone" 
            required="true" 
            placeholder="Укажите телефон" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Старый пароль</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-old-password" 
            type="password" 
            name="oldPassword" 
            required="true" 
            placeholder="Старый пароль" 
            groupClass="form__input-group-settings" 
          }}
        </div>

        <div class="profile__settings-fields">
          <p class="profile__settings-field">Новый пароль</p>
          {{> Input 
            inputClass="form__input-setting" 
            id="profile-new-password" 
            type="password" 
            name="newPassword" 
            required="true" 
            placeholder="Новый пароль" 
            groupClass="form__input-group-settings" 
          }}
        </div>
      </div>
    {{/Form}}
    {{> Button class=button.class type=button.type form=button.form text=button.text id=button.id}}
  </div>
`;
