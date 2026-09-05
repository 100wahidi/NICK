import { Loader2 } from "lucide-react";

export default function WorkflowLoading({ title, description }) {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center px-4 py-16 text-center">
      <div className="w-full max-w-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#3DBB78]/30 bg-[#3DBB78]/10">
          <Loader2 className="h-8 w-8 animate-spin text-[#3DBB78]" aria-hidden="true" />
        </div>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-[#3DBB78]">
          CurateCV is working
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#F5F7FA] sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#9EA7B3]">
          {description}
        </p>
        <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-[#262C36]">
          <div className="workflow-loading-bar h-full w-2/5 rounded-full bg-[#3DBB78]" />
        </div>
      </div>
    </section>
  );
}
