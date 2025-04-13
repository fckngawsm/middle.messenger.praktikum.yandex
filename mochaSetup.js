import { JSDOM } from "jsdom";

const dom = new JSDOM(
  `
  <!DOCTYPE html>
  <html>
    <body>
      <div class="page">
        <main class="main"></main>
      </div>
    </body>
  </html>
  `,
  {
    url: "http://localhost:3000",
  }
);

global.window = dom.window;
global.history = window.history
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;

// Создаем элемент main с id
const mainElement = document.createElement("main");
mainElement.id = "main";
mainElement.className = "main";
document.body.appendChild(mainElement);
