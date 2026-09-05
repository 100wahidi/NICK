import { ArrowLeft, FileText, Loader2, Sparkles } from "lucide-react";

const accentClasses = {
  indigo: "border-[#3DBB78]/50 bg-[#3DBB78]/10",
  emerald: "border-[#3DBB78]/50 bg-[#3DBB78]/10",
};

function MatchList({ items, selected, onToggle, emptyText, accent }) {
  if (!items.length) return <p className="text-sm text-slate-500">{emptyText}</p>;

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const checked = selected.includes(index);
        return (
          <button
            key={`${item.title || "record"}-${index}`}
            type="button"
            onClick={() => onToggle(index)}
            className={`w-full rounded-xl border p-4 text-left transition-all ${checked ? accentClasses[accent] : "border-slate-800 bg-slate-950/40 opacity-60 hover:opacity-100"}`}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="flex items-center gap-2">
                <input type="checkbox" checked={checked} readOnly className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-200">{item.title || "Untitled Record"}</span>
              </span>
            </span>
            {item.content && <span className="mt-2 block whitespace-pre-line pl-6 text-xs leading-relaxed text-slate-400">{item.content}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function MatchSelectionStep({ matches, selectedProjects, selectedExperiences, onToggleProject, onToggleExperience, onBack, onGenerate, loading }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="w-full max-w-4xl py-4 sm:py-8">
        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-[#F5F7FA] sm:text-4xl">Select the strongest evidence</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#9EA7B3]">Choose the projects and experiences that best support this application.</p>
        {loading && <div className="mt-6 flex justify-center text-sm text-[#BDE8CD]"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Finding matches...</div>}
      </div>
      <div className="grid w-full max-w-4xl gap-6 text-left lg:grid-cols-2">
        <div className="py-6">
          <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-indigo-400" /><h2 className="text-lg font-semibold">Matched Projects</h2></div><span className="text-xs text-slate-400">{selectedProjects.length}/{matches.projects.length}</span></div>
          <MatchList items={matches.projects} selected={selectedProjects} onToggle={onToggleProject} emptyText="No matching projects returned." accent="indigo" />
        </div>
        <div className="py-6">
          <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-emerald-400" /><h2 className="text-lg font-semibold">Matched Experiences</h2></div><span className="text-xs text-slate-400">{selectedExperiences.length}/{matches.experiences.length}</span></div>
          <MatchList items={matches.experiences} selected={selectedExperiences} onToggle={onToggleExperience} emptyText="No matching experiences returned." accent="emerald" />
        </div>
      </div>
      <div className="mt-6 flex w-full max-w-4xl items-center justify-between text-left">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:bg-slate-800"><ArrowLeft className="h-4 w-4" /> Adjust Skills</button>
        <button type="button" onClick={onGenerate} disabled={loading || (!selectedProjects.length && !selectedExperiences.length)} className="inline-flex items-center gap-2 rounded-xl bg-[#3DBB78] px-6 py-3 text-sm font-semibold text-[#06140D] hover:bg-[#35A86B] disabled:opacity-60">Generate Tailored CV <Sparkles className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
