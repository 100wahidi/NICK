import { useEffect, useState } from "react";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function GeneratedCvStep({ pdfUrl, onBack }) {
  const [previewImage, setPreviewImage] = useState("");
  const [previewError, setPreviewError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let imageUrl = "";

    async function renderPdfPreview() {
      if (!pdfUrl) {
        setPreviewImage("");
        return;
      }

      setPreviewImage("");
      setPreviewError("");

      try {
        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas rendering is not available.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        imageUrl = canvas.toDataURL("image/png");

        if (!cancelled) {
          setPreviewImage(imageUrl);
        }
      } catch (error) {
        if (!cancelled) {
          setPreviewError(error.message || "Unable to render the PDF preview.");
        }
      }
    }

    renderPdfPreview();

    return () => {
      cancelled = true;
      imageUrl = "";
    };
  }, [pdfUrl]);

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="w-full max-w-4xl py-4 sm:py-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#3DBB78]">Step 04 / Resume output</p>
        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-[#F5F7FA] sm:text-4xl">Your resume is ready</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#9EA7B3]">Review the generated document and download the PDF.</p>
        <div className="mt-8 flex items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-2 text-[#3DBB78]">
          <FileText className="h-5 w-5" />
          <h2 className="text-xl font-semibold text-[#F5F7FA]">Generated Resume PDF</h2>
        </div>

        {pdfUrl && (
          <a
            href={pdfUrl}
            download="tailored-resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#3DBB78]/40 bg-[#3DBB78]/10 px-3 py-1.5 text-xs text-[#BDE8CD] hover:bg-[#3DBB78]/20"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>
        )}
      </div>

      {pdfUrl && !previewImage && !previewError ? (
        <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-[#262C36] bg-[#111418]">
          <div className="text-center text-sm text-[#9EA7B3]">
            <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-[#3DBB78]" />
            Preparing resume preview...
          </div>
        </div>
      ) : previewImage ? (
        <div className="flex justify-center overflow-auto rounded-lg border border-[#262C36] bg-[#111418] p-5">
          <img
            src={previewImage}
            alt="Generated resume preview"
            className="block h-auto w-full max-w-3xl bg-white object-contain shadow-[0_0_28px_rgba(255,255,255,0.12)]"
          />
        </div>
      ) : previewError ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-300">
          {previewError}
        </div>
      ) : (
        <p className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-400">
          No PDF generated.
        </p>
      )}

      <div className="mt-6 flex justify-start">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-[#262C36] px-5 py-3 text-sm text-[#9EA7B3] hover:bg-[#111418]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Matches
        </button>
      </div>
      </div>
    </div>
  );
}
