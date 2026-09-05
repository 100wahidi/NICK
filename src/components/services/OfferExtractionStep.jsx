import { ArrowRight, FileText } from "lucide-react";

export default function OfferExtractionStep({ value, onChange, onSubmit, loading }) {
  return (
    <div className="flex w-full flex-col items-center py-4 text-center sm:py-8">
      <div className="flex max-w-3xl flex-col items-center">


        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-[#F5F7FA] sm:text-4xl">
          What role are you applying for?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#9EA7B3]">
          Paste the complete job offer below. CurateCV will identify the role,
          technical requirements, experience expectations, and key terms used
          to match your profile.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 w-full max-w-4xl space-y-5 text-left">
        <label htmlFor="job-offer" className="block text-sm items-center font-medium text-[#F5F7FA]">
          Job offer
        </label>
        <textarea
          id="job-offer"
          rows={10}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste the job title, responsibilities, requirements, and qualifications here..."
          className="w-full resize-y rounded-lg border border-[#262C36] bg-[#111418] p-4 text-sm leading-6 text-[#F5F7FA] outline-none transition placeholder:text-[#66717F] focus:border-[#3DBB78] focus:ring-2 focus:ring-[#3DBB78]/15"
          required
        />
        <p className="text-xs text-[#697383]">
          Your offer is used only to extract matching criteria for the next step.
        </p>
        <div className="flex justify-end">
          <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#3DBB78] px-5 py-3 text-sm font-semibold text-[#06140D] transition hover:bg-[#35A86B] focus:outline-none focus:ring-2 focus:ring-[#3DBB78] focus:ring-offset-2 focus:ring-offset-[#0B0D10] disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate"}
          {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
