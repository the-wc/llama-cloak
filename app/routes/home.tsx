import { Gui } from "~/gui/gui";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "llama-cloak" },
    { name: "description", content: "A local gui for using LLM work." },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-[90vh] items-center justify-center w-full font-sans tracking-tight">
      <div className="grow" />
      <Gui />
      <div className="grow" />
    </div>
  );
}
