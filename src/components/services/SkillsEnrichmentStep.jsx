import { ArrowLeft, ArrowRight, Plus, Sparkles, Upload } from "lucide-react";

export default function SkillsEnrichmentStep({
  insights,
  projectSkills,
  manualSkill,
  onManualSkillChange,
  onAddSkill,
  onRemoveSkill,
  cvFile,
  cvStats,
  uploading,
  onUploadCv,
  onBack,
  onContinue,
}) {
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





          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#262C36] bg-[#111418] p-4 transition hover:border-[#3DBB78]">
            <Upload className="h-5 w-5 text-[#3DBB78]" />
            <span className="text-sm text-[#F5F7FA]">
              {uploading ? "Parsing your CV..." : cvStats ? `Indexed: ${cvStats.experiencesCount} experiences and ${cvStats.projectsCount} projects.` : cvFile ? cvFile.name : "Upload an existing CV (PDF)"}
            </span>
            <input type="file" accept="application/pdf" onChange={onUploadCv} disabled={uploading} className="hidden" />
          </label>

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-lg border border-[#262C36] px-5 py-3 text-sm text-[#9EA7B3] hover:bg-[#111418]">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={onContinue} className="inline-flex items-center gap-2 rounded-lg bg-[#3DBB78] px-6 py-3 text-sm font-semibold text-[#06140D] hover:bg-[#35A86B]">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>

      </div>
    </div>
  );
}
