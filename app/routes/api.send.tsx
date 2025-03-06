import { emitter } from "~/.server/emitter";
import type { Route } from "./+types/api.send";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const prompt = formData.get("prompt") as string | null;
  if (prompt) emitter.emit("message", prompt);
  return { success: true };
}
