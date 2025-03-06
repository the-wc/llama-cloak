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
    } catch (e) {
      console.error("Request failed:", e);
      throw e;
    }
  }
}
