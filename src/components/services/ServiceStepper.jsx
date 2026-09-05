import { Check } from "lucide-react";

export default function ServiceStepper({ steps, currentStep }) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative mb-12 flex items-center justify-between px-6 sm:px-12">
      <div className="absolute left-12 right-12 top-5 h-0.5 bg-slate-800" />
      <div
        className="absolute left-12 top-5 h-0.5 bg-[#3DBB78] transition-all duration-500"
        style={{ width: `calc(${progress}% - ${progress * 0.24}px)` }}
      />
      {steps.map((step) => {
        const completed = currentStep > step.id;
        const active = currentStep === step.id;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                completed
                  ? "border-[#3DBB78] bg-[#3DBB78] text-[#06140D]"
                  : active
                  ? "border-[#3DBB78] bg-slate-900 text-[#3DBB78] ring-4 ring-[#3DBB78]/20"
                  : "border-slate-800 bg-slate-950 text-slate-600"
              }`}
            >
              {completed ? <Check className="h-4 w-4" /> : step.id}
            </div>
            <span
              className={`mt-2 text-xs font-medium tracking-wide ${
                active ? "text-[#3DBB78]" : completed ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
