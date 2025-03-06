import { ArrowUp, Loader2 } from "lucide-react";
import { Form, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export function ChatInput() {
  const fetcher = useFetcher();
  return (
    <div className="flex flex-col max-w-lg w-full">
      <fetcher.Form
        method="POST"
        className="w-full"
        action="/api/send"
      >
        <Textarea
          name="prompt"
          placeholder="What did you want to do?"
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
