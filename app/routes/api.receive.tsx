import { eventStream } from "remix-utils/sse/server";

import type { Route } from "./+types/api.receive";
import { LlamaClient } from "~/.server/llama-client";
import { emitter } from "~/.server/emitter";

export async function loader({ request }: Route.ActionArgs) {
  return eventStream(request.signal, (send) => {
    async function handle(prompt: string) {
      try {
        const stream = await LlamaClient.chat(prompt ?? "");
        stream.on("data", (buffer: Buffer) => {
          try {
            const chunk: ResponseChunk = JSON.parse(buffer.toString());
            console.log(chunk);
            send({
              event: "api-chat",
              data: JSON.stringify(chunk),
            });

            if (chunk.done) {
              // stream.destroy();
            }
            // console.log(jsonData.response); // Process the response text
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
type ResponseChunk = {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
};
