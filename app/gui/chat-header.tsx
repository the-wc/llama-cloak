export function ChatHeader() {
  return (
    <div className="flex flex-col max-w-lg font-poppins items-center space-y-2">
      <div className="flex items-center gap-x-1">
        <img
          src="/logo.svg"
          className="size-10"
        />
        <p className="font-light tracking-wide">llama-cloak</p>
      </div>

      <h3 className="scroll-m-20 text-2xl text-center font-semibold tracking-tight">
        A simple UI for local LLama
      </h3>
    </div>
  );
}
