import { LoginPage } from "../../templates";

export class LoginStrategy {
  constructor(appElement) {
    this.appElement = appElement; // Передаем appElement в конструктор
  }

  render() {
    const template = Handlebars.compile(LoginPage);
    this.appElement.innerHTML = template({
      // Здесь можно передать данные, если они нужны
      title: "Login", // Например, заголовок
      errorMessage: "", // Или пустое сообщение об ошибке
    });
  }
}
