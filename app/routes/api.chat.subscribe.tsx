import { eventStream } from "remix-utils/sse/server";

import type { Route } from "./+types/api.chat.subscribe";
import { LlamaClient } from "~/.server/llama-client";
import { emitter } from "~/.server/emitter";
import type { OllamaResponseChunk } from "~/lib/utils";

export async function loader({ request }: Route.ActionArgs) {
  return eventStream(request.signal, (send) => {
    async function handle(prompt: string) {
      try {
        const stream = await LlamaClient.chat(prompt);
        stream.on("data", (buffer: Buffer) => {
          try {
            const chunk: OllamaResponseChunk = JSON.parse(buffer.toString());
            send({
              event: "api-chat",
              data: JSON.stringify(chunk),
            });
            if (chunk.done) stream.destroy();
          } catch (error) {
            console.error("Error parsing JSON:", (error as Error).message);
          }
        });

        stream.on("end", () => {
          console.log("Streaming complete.");
        });
      } catch (e) {
        console.error("Error: ", e);
      }
    }

    emitter.on("message", handle);

    return function clear() {
      emitter.off("message", handle);
    };
  });
}
