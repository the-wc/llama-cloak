import { ArrowUp, Loader2 } from "lucide-react";
import { useFetcher } from "react-router";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { addMessage } from "~/lib/storage";

export function ChatInput() {
  const fetcher = useFetcher();
  const [prompt, setPrompt] = useState("");
  return (
    <div className="flex flex-col max-w-2xl w-full">
      <fetcher.Form
        method="POST"
        className="w-full"
        action="/api/send"
        onSubmit={() => {
          addMessage({
            response: prompt,
            role: "user",
            createdAt: new Date(),
          });
          setPrompt("");
        }}
      >
        <Textarea
          name="prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="What do you need help with?"
          className="border-0 ring-0 focus-visible:ring-0 focus-within:ring-0 resize-none"
        />
        <div className="flex items-center gap-x-2">
          <div className="grow" />
          <Button
            className="rounded-full"
            disabled={fetcher.state !== "idle"}
            size="icon"
            type="submit"
          >
            {fetcher.state !== "idle" && <Loader2 />}
            {fetcher.state === "idle" && <ArrowUp />}
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
