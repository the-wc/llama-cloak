export type Message = {
  response: string;
  createdAt: Date;
  role: "user" | "ai";
};

export function addMessage(message: Message) {
  if (localStorage && message.response.length > 0) {
    const messages = getMessages();
    localStorage.setItem("messages", JSON.stringify([...messages, message]));
  }
}

export function getMessages(): Message[] {
  if (localStorage) {
    const storedMessages = localStorage.getItem("messages");
    const messages = JSON.parse(storedMessages ?? "[]") as Message[];
    return messages;
  }
  return [];
}
