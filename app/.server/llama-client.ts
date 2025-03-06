import axios from "axios";
import { Readable } from "stream";

export class LlamaClient {
  private static HOST = "http://localhost:11434";

  public static async chat(prompt: string): Promise<Readable> {
    try {
      const response = await axios.post<Readable>(
        LlamaClient.HOST + "/api/generate",
        {
          model: "llama3.2",
          prompt,
        },
        {
          responseType: "stream",
        }
      );

      return response.data;

      //   response.data.on("data", (chunk: ResponseChunk) => {
      //     const lines = chunk
      //       .toString()
      //       .split("\n")
      //       .filter((line) => line.trim());
      //     for (const line of lines) {
      //       try {
      //         const json = JSON.parse(line);
      //         console.log(json.response); // Process the streamed response
      //         if (json.done) {
      //           console.log("Stream finished.");
      //           response.data.destroy(); // Close the stream
      //         }
      //       } catch (err) {
      //         console.error("Error parsing JSON:", err);
      //       }
      //     }
      //   });

      //   response.data.on("end", () => {
      //     console.log("Streaming complete.");
      //   });
    } catch (e) {
      console.error("Request failed:", e);
      throw e;
    }
  }
}
