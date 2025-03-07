import { CheckCircle2 } from "lucide-react";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export function Gui() {
  const [hasMessages, setHasMessages] = useState(false);
  useEffect(() => {
    if (window) {
      setHasMessages(!!localStorage.getItem("messages"));
    }
  }, []);

  return (
    <>
      {!hasMessages && <ChatHeader />}

      <ChatMessages />
      <div className="my-4" />

      <div
        className={cn(
          "w-full",
          hasMessages ? "sticky bottom-0 pb-4 z-100 bg-white" : ""
        )}
      >
        <div className="w-full flex flex-col items-center">
          <div className="bg-white border shadow-xs w-full max-w-2xl rounded-md p-4">
            <ChatInput />
          </div>
          <div className="my-1" />
          <div className="w-full max-w-lg flex items-center gap-x-2">
            <p className="text-xs text-muted-foreground text-nowrap">
              Using <span className="font-mono underline">llama 3.2</span>.
            </p>
            <div className="grow" />
            <div className="text-xs flex gap-x-2 items-center tracing-wide font-mono text-emerald-600">
              <p>Online</p>
              <CheckCircle2 className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
