import { RegisterPage } from "../../pages";
import { Block } from "../../shared/components/Block";
import { Button } from "../../shared/ui/Buttons/Button";
import { Input } from "../../shared/ui/Inputs/Input";
import { Link } from "../../shared/ui/Link";
import { Spacer } from "../../shared/ui/Spacer";
import { PageStrategy } from "./PageStrategies";

export class RegisterStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      EmailInput: new Input({
        attr: {
          id: "email",
          type: "email",
          name: "email",
          required: true,
        },
        helperText: "Неверный email",
        label: "Почта",
        onBlur: (e: Event) => console.log(312321312),
      }),
      LoginInput: new Input({
        attr: {
          id: "login",
          type: "text",
          name: "login",
          required: true,
        },
        helperText: "Неверный логин",
        label: "Логин",
        onBlur: (e: Event) => console.log(312321312),
      }),
      FirstNameInput: new Input({
        attr: {
          id: "first_name",
          type: "text",
          name: "first_name",
          required: true,
        },
        helperText: "Неверное имя",
        label: "Имя",
        onBlur: (e: Event) => console.log(312321312),
      }),
      SecondNameInput: new Input({
        attr: {
          id: "second_name",
          type: "text",
          name: "second_name",
          required: true,
        },
        helperText: "Неверная фамилия",
        label: "Фамилия",
        onBlur: (e: Event) => console.log(312321312),
      }),
      PhoneInput: new Input({
        attr: {
          id: "phone",
          type: "tel",
          name: "phone",
          required: true,
        },
        helperText: "Неверный номер телефона",
        label: "Телефон",
        onBlur: (e: Event) => console.log(312321312),
      }),
      PasswordInput: new Input({
        attr: {
          id: "password",
          type: "password",
          name: "password",
          required: true,
        },
        helperText: "Пароль слишком короткий",
        label: "Пароль",
        onBlur: (e: Event) => console.log(312321312),
      }),
      PasswordRepeatInput: new Input({
        attr: {
          id: "password-repeat",
          type: "password",
          name: "password-repeat",
          required: true,
        },
        helperText: "Пароли не совпадают",
        label: "Пароль (ещё раз)",
        onBlur: (e: Event) => console.log(312321312),
      }),
      RegisterButton: new Button({
        attr: {
          id: "register-button",
          className: "button link",
          type: "submit",
          form: "register-form",
        },
        text: "Зарегистрироваться",
        onClick: (event: Event) => {
          console.log("CLICK");
          event.preventDefault();
          event.stopPropagation();
        },
      }),
      Spacer: new Spacer(),
      Link: new Link({
        attr: {
          id: "login-link",
          to: "/sign-in",
          className: "link__auth",
        },
        linkText: "Уже есть аккаунт? Войти",
      }),
    });
  }

  protected render(): string {
    return RegisterPage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
