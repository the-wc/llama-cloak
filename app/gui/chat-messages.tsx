import { useEffect, useState } from "react";
import { useEventSource } from "remix-utils/sse/react";
import type { OllamaResponseChunk } from "~/lib/utils";

export function ChatMessages() {
  const outputChunk = useEventSource("/api/chat/subscribe", {
    event: "api-chat",
  });

  useEffect(() => {
    if (outputChunk) {
      console.log(outputChunk);
      const data = JSON.parse(outputChunk) as OllamaResponseChunk;
      setChunkBuffer((prev) =>
        [...prev, data].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      );
      if (data.done) setChunkBuffer([]);
    }
  }, [outputChunk]);

  const [chunkBuffer, setChunkBuffer] = useState<OllamaResponseChunk[]>([]);

  return (
    <div className="flex flex-col items-start">
      {chunkBuffer.map((c) => c.response).join("")}
    </div>
  );
}
