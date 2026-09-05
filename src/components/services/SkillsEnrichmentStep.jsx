import { useState } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, FolderKanban, Plus, Upload } from "lucide-react";

export default function SkillsEnrichmentStep({
  insights,
  cvFile,
  cvStats,
  manualEntries,
  uploading,
  savingEntryType,
  onUploadCv,
  onBack,
  onContinue,
  onAddManualEntry,
}) {
  const [entryType, setEntryType] = useState(null);
  const [entryTitle, setEntryTitle] = useState("");
  const [entryContent, setEntryContent] = useState("");
  const hasRegisteredEntries = Boolean(
    (cvStats?.experiencesCount || 0) +
      (cvStats?.projectsCount || 0) +
      manualEntries.experiences.length +
      manualEntries.projects.length
  );

  const submitEntry = (event) => {
    event.preventDefault();
    const title = entryTitle.trim();
    const content = entryContent.trim();
    if (!title || !content) return;
    onAddManualEntry(entryType, { title, content }).then(() => {
      setEntryTitle("");
      setEntryContent("");
      setEntryType(null);
    }).catch(() => {});
  };

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="w-full max-w-4xl py-4 sm:py-8">

        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-[#F5F7FA] sm:text-4xl">
          Complete your matching profile
        </h2>

        <div className="mx-auto mt-8 max-w-3xl border-y border-[#262C36] py-6 text-left">
          <p className="text-xs uppercase tracking-wider text-[#3DBB78]">Target role</p>
          <h3 className="mt-1 text-xl font-semibold text-[#F5F7FA]">
            {insights.title || "Position Overview"}
          </h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-semibold text-[#F5F7FA]">Extracted skills</h4>
              <div className="flex flex-wrap gap-2">
                {insights.technical_skills.length ? insights.technical_skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-[#262C36] bg-[#171B21] px-2.5 py-1 text-xs text-[#F5F7FA]">
                    {skill}
                  </span>
                )) : <span className="text-xs text-[#697383]">No technical skills found.</span>}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-[#F5F7FA]">Required experience</h4>
              {insights.required_experiences.length ? (
                <ul className="list-inside list-disc space-y-1 text-xs text-[#9EA7B3]">
                  {insights.required_experiences.map((experience) => <li key={experience}>{experience}</li>)}
                </ul>
              ) : <span className="text-xs text-[#697383]">No specific experience parsed.</span>}
            </div>
          </div>
        </div>





          {!hasRegisteredEntries && (
            <div className="mt-6 rounded-lg border border-[#3DBB78]/30 bg-[#3DBB78]/[0.06] p-4 text-left">
              <p className="text-sm font-semibold text-[#F5F7FA]">Your profile has no registered projects or experiences yet.</p>
              <p className="mt-1 text-xs leading-5 text-[#9EA7B3]">Add them manually or upload a CV to build the evidence used for matching.</p>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#262C36] bg-[#111418] p-4 transition hover:border-[#3DBB78]">
              <Upload className="h-5 w-5 shrink-0 text-[#3DBB78]" />
              <span className="text-sm text-[#F5F7FA]">
                {uploading ? "Parsing your CV..." : cvStats ? `Indexed: ${cvStats.experiencesCount} experiences and ${cvStats.projectsCount} projects.` : cvFile ? cvFile.name : "Upload an existing CV (PDF)"}
              </span>
              <input type="file" accept="application/pdf" onChange={onUploadCv} disabled={uploading} className="hidden" />
            </label>
            <button type="button" onClick={() => setEntryType("experiences")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#262C36] bg-[#111418] px-4 py-3 text-sm font-medium text-[#F5F7FA] transition hover:border-[#3DBB78] hover:bg-[#171B21]">
              <BriefcaseBusiness className="h-4 w-4 text-[#3DBB78]" /> Add experience
            </button>
            <button type="button" onClick={() => setEntryType("projects")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#262C36] bg-[#111418] px-4 py-3 text-sm font-medium text-[#F5F7FA] transition hover:border-[#3DBB78] hover:bg-[#171B21]">
              <FolderKanban className="h-4 w-4 text-[#3DBB78]" /> Add project
            </button>
          </div>

          {entryType && (
            <form onSubmit={submitEntry} className="mt-5 rounded-lg border border-[#262C36] bg-[#111418] p-4 text-left">
              <h4 className="text-sm font-semibold text-[#F5F7FA]">Add {entryType === "experiences" ? "an experience" : "a project"}</h4>
              <input value={entryTitle} onChange={(event) => setEntryTitle(event.target.value)} placeholder="Title" className="mt-3 w-full rounded-md border border-[#262C36] bg-[#171B21] px-3 py-2 text-sm text-[#F5F7FA] outline-none focus:border-[#3DBB78]" />
              <textarea value={entryContent} onChange={(event) => setEntryContent(event.target.value)} placeholder="Describe the work, features, architecture, or impact" rows={4} className="mt-3 w-full resize-y rounded-md border border-[#262C36] bg-[#171B21] px-3 py-2 text-sm text-[#F5F7FA] outline-none focus:border-[#3DBB78]" />
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEntryType(null)} className="rounded-md px-3 py-2 text-xs text-[#9EA7B3] hover:bg-[#171B21]">Cancel</button>
                <button type="submit" disabled={!entryTitle.trim() || !entryContent.trim() || savingEntryType} className="inline-flex items-center gap-1 rounded-md bg-[#3DBB78] px-3 py-2 text-xs font-semibold text-[#06140D] disabled:opacity-50"><Plus className="h-3 w-3" /> {savingEntryType ? "Saving..." : "Add"}</button>
              </div>
            </form>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-lg border border-[#262C36] px-5 py-3 text-sm text-[#9EA7B3] hover:bg-[#111418]">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={onContinue} disabled={Boolean(savingEntryType)} className="inline-flex items-center gap-2 rounded-lg bg-[#3DBB78] px-6 py-3 text-sm font-semibold text-[#06140D] hover:bg-[#35A86B] disabled:opacity-60">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>

      </div>
    </div>
  );
}
