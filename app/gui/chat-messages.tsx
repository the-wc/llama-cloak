import { useEffect } from "react";
import { useEventSource } from "remix-utils/sse/react";

export function ChatMessages() {
  const eventStream = useEventSource("/api/receive", {
    event: "api-chat",
  });

  useEffect(() => {
    if (eventStream) console.log(eventStream);
  }, [eventStream]);

  return (
    <div className="flex flex-col items-start">
      <p>Hi</p>
    </div>
  );
}
