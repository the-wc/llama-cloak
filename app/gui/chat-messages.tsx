import { useEffect, useRef, useState } from "react";
import { useEventSource } from "remix-utils/sse/react";
import Markdown from "react-markdown";

import { addMessage, getMessages, type Message } from "~/lib/storage";
import { cn, type OllamaResponseChunk } from "~/lib/utils";

export function ChatMessages() {
  const outputChunk = useEventSource("/api/chat/subscribe", {
    event: "api-chat",
  });

  useEffect(() => {
    if (outputChunk) {
      const data = JSON.parse(outputChunk) as OllamaResponseChunk;
      setChunkBuffer((prev) =>
        [...prev, data].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      );
      if (data.done) {
        const message = chunkBuffer.map((c) => c.response).join("");
        addMessage({
          response: message,
          createdAt: new Date(),
          role: "ai",
        });
        setChunkBuffer([]);
        setMessages(getMessages());
      }
    }
  }, [outputChunk]);

  const [chunkBuffer, setChunkBuffer] = useState<OllamaResponseChunk[]>([]);
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    if (window) {
      const storedMessages = getMessages();
      setMessages(storedMessages);
    }
  }, []);

  const messageAnchorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chunkBuffer]);

  return (
    <div className="max-w-4xl w-full font-poppins tracking-normal">
      {messages
        ?.filter((m) => m.response.length > 0)
        .map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full p-2",
              message.role === "ai" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-md  max-w-[75%]",
                message.role === "ai" ? "bg-white" : "bg-secondary "
              )}
            >
              <div className="font-normal leading-6 overflow-y-hidden py-2">
                <Markdown>{message.response}</Markdown>
              </div>
            </div>
          </div>
        ))}
      {chunkBuffer && chunkBuffer.length > 0 && (
        <div className="flex w-full justify-start p-2">
          <div className="p-3 rounded-md bg-secondary max-w-[75%]">
            <div className="font-normal leading-5">
              <Markdown>{chunkBuffer.map((c) => c.response).join("")}</Markdown>
            </div>
          </div>
        </div>
      )}
      <div
        className=""
        ref={messageAnchorRef}
      />
    </div>
  );
}
