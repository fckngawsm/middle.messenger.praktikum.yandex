import "../styles/index.css";
import { App } from "./App";
// TODO: подумать над паттерном стратегия или все такие состояние?

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.render();
});
