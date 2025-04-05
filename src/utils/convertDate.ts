export const convertDate = (date: string) => {
  const messageDate = new Date(date);

  if (Number.isNaN(messageDate.getTime())) {
    return "Начните диалог :)";
  }

  const currentDate = new Date();
  const isToday = messageDate.toDateString() === currentDate.toDateString();

  if (isToday) {
    return messageDate.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return messageDate.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
