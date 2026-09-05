import cvPreviewImg from "./assets/image.png";

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

        <div className="cv-preview-shell mt-10 w-full max-w-2xl border border-[#262C36] bg-[#171B21] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <div className="cv-preview-frame">
            <img
              src={cvPreviewImg}
              alt="Preview of an ATS-friendly generated resume"
              className="cv-preview-image relative z-0 mx-auto block max-h-[520px] w-full object-contain object-top"
            />
            <div className="cv-preview-reflection" aria-hidden="true" />
          </div>
        </div>



      </section>
    </main>
  );
}
