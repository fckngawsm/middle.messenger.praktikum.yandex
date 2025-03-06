# Chatik

Проект представляет собой чат, написанный на чистом TypeScript с использованием шаблонов Handlebars и иконок из [Google Fonts Icons](https://fonts.google.com/icons). Макет приложения доступен [здесь](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f&t=MYYY87zCEEplAMAO-0).

## Описание проекта

Этот чат-приложение состоит из нескольких страниц, каждая из которых имеет свою стратегию отображения:

- **/messenger** — страница чата, где отображаются сообщения пользователей.
- **/sign-up** — страница регистрации нового пользователя.
- **/sign-in** или **/** — страница входа.
- **/settings** — страница настроек профиля пользователя.
- **/error-500** — страница, отображающая ошибку сервера.
- **Любая другая страница, например, not-found-page** — страница "Не найдено".

Паттерн **Strategy** используется для рендеринга разных страниц. В проекте активно используется Handlebars для шаблонизации, а также иконки и стили, соответствующие макету.

## Команды
1. `npm i` - Установка зависимостей
2. `npm run start` - Запуск в режиме разработки
3. `npm run build` - Сборка проекта

## Netlify
https://chatik-ya.netlify.app/


## TODO:
3. Проверить инпуты в настройках
5. Проверить какие блоки не используются / удалить или переиспользовать