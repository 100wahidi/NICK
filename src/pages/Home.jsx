import { FileSearch, MousePointerClick, Sparkles } from "lucide-react";
import cvPreviewImg from "./assets/CvImage.png";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#0B0D10] text-[#F5F7FA]">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-16 pt-16 text-center sm:px-8 lg:pt-20">


        <h1 className="max-w-3xl text-6xl font-bold leading-tight tracking-[-0.03em] text-[#F5F7FA] sm:text-7xl">
          CurateCV
        </h1>
        <h2 className="max-w-2xl text-1xl font-bold leading-tight tracking-[-0.03em] text-[#F5F7FA] sm:text-3xl">
          Craft your career story with precision.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#9EA7B3] sm:text-lg">
          Paste your dream job posting and generate an application-ready resume.
        </p>

        <section className="mt-10 w-full max-w-3xl" aria-labelledby="how-it-works-title">
          <h2 id="how-it-works-title" className="sr-only">How CurateCV works</h2>
          <div className="guide-steps">
            <GuideStep
              icon={FileSearch}
              label="Paste offer"
            />
            <GuideStep
              icon={MousePointerClick}
              label="Shape profile"
            />
            <GuideStep
              icon={Sparkles}
              label="Get tailored CV"
            />
          </div>
        </section>

        <div className="mt-10 grid w-full max-w-4xl items-center gap-10 text-left md:grid-cols-[minmax(0,1fr)_minmax(250px,0.8fr)] md:gap-14">
          <div className="cv-preview-shell w-full max-w-md justify-self-center border border-[#262C36] bg-[#171B21] p-2 shadow-[0_10px_50px_rgba(0,0,0,0.28)] md:justify-self-end">
            <div className="cv-preview-frame aspect-[8.5/11]">
              <img
                src={cvPreviewImg}
                alt="Preview of an ATS-friendly generated resume"
                className="cv-preview-image relative z-0 block h-full w-full object-contain object-top"
              />
              <div className="cv-preview-reflection" aria-hidden="true" />
            </div>
          </div>

          <aside className="max-w-sm text-center text-white" aria-labelledby="application-insight-title">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3DBB78]">How CurateCV works</p>
            <h2 id="application-insight-title" className="mt-3 text-2xl font-bold leading-tight text-[#F5F7FA]">
              Your profile, ready for every opportunity.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#DCE2E7] sm:text-lg">
              The CV preview shows the result: a focused document built from the experience that best supports your next application.
            </p>
            <ol className="mt-6 space-y-4 text-left text-sm leading-6 text-[#AEB7C0] sm:text-base">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3DBB78] text-xs font-bold text-[#06140D]">1</span>
                <span><strong className="font-semibold text-[#F5F7FA]">Build once.</strong> Create your account and add your education, contact details, projects, and experience.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3DBB78] text-xs font-bold text-[#06140D]">2</span>
                <span><strong className="font-semibold text-[#F5F7FA]">Bring your source.</strong> Upload an existing CV or add new entries manually. Your profile stays organized.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3DBB78] text-xs font-bold text-[#06140D]">3</span>
                <span><strong className="font-semibold text-[#F5F7FA]">Match and generate.</strong> Paste an offer and CurateCV retrieves the strongest evidence for a tailored CV.</span>
              </li>
            </ol>
          </aside>
        </div>



      </section>
    </main>
  );
}

function GuideStep({ icon: Icon, label }) {
  return (
    <article className="guide-step group flex flex-col items-center text-center">
      <div className="guide-step-circle relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#3DBB78] bg-[#101914] text-[#3DBB78]">
        <Icon className="h-8 w-8" strokeWidth={2.2} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#F5F7FA] sm:text-base">{label}</h3>
    </article>
  );
}
