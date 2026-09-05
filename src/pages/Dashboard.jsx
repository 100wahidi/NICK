import React, { useState } from "react";
import { extractionAPI, retrievalAPI, generationAPI } from "../components/networking/api";

export default function ServiceWorkflowPage() {
  // Step tracking: 1 = Ingest, 2 = Analyze JD, 3 = Review & Refine, 4 = Export/Preview
  const [currentStep, setCurrentStep] = useState(1);

  // States for data across steps
  const [file, setFile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [jobDescription, setJobDescription] = useState("");
  const [retrievedContext, setRetrievedContext] = useState([]);
  
  const [latexSource, setLatexSource] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // -------------------------------------------------------------
  // STEP 1: Ingest (Upload CV or Manual Entry)
  // -------------------------------------------------------------
  const handleProcessCv = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setStatusMsg("Parsing CV with Mistral AI...");

    try {
      // auto_persist = false to let user review first
      const res = await extractionAPI.processCv(file, false);
      setExperiences(res.data.experiences || []);
      setProjects(res.data.projects || []);
      setStatusMsg("Extraction successful! Review items below and proceed.");
      setCurrentStep(2); // Move to analyze step
    } catch (err) {
      setStatusMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManualEntries = async () => {
    setLoading(true);
    try {
      await extractionAPI.insertManual({ experiences, projects });
      setStatusMsg("Profile saved to database successfully!");
      setCurrentStep(2);
    } catch (err) {
      setStatusMsg(`Error saving: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // STEP 2: Analyze Job Description & Retrieve Context
  // -------------------------------------------------------------
  const handleAnalyzeJD = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    setLoading(true);
    setStatusMsg("Running vector similarity search (pgvector)...");

    try {
      const res = await retrievalAPI.queryContext({
        query: jobDescription,
        top_k: 5,
      });
      setRetrievedContext(res.chunks || []);
      setStatusMsg("Context retrieved successfully. Ready for generation.");
      setCurrentStep(3); // Move to review & refine step
    } catch (err) {
      setStatusMsg(`Retrieval error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // STEP 3: Review, Refine & Generate Content
  // -------------------------------------------------------------
  const handleGenerateAndCompile = async () => {
    setLoading(true);
    setStatusMsg("Synthesizing tailored content and compiling LaTeX...");

    try {
      // 1. Generate tailored text via LLM
      const genRes = await generationAPI.generateContent({
        prompt: "Generate tailored resume content based on JD",
        job_description: jobDescription,
      });

      const rawLatex = genRes.latex || genRes.content || "% Compiled LaTeX Output";
      setLatexSource(rawLatex);

      // 2. Compile LaTeX to binary PDF Blob
      const pdfBlob = await generationAPI.downloadCompiledPdf(rawLatex);
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(blobUrl);

      setStatusMsg("Resume compiled successfully!");
      setCurrentStep(4); // Move to final export step
    } catch (err) {
      setStatusMsg(`Generation/Compilation error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>CV Adaptation Service Workflow</h1>
      
      {/* Progress Tracker */}
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", fontWeight: "bold" }}>
        <span style={{ color: currentStep === 1 ? "blue" : "gray" }}>1. Ingest</span>
        <span style={{ color: currentStep === 2 ? "blue" : "gray" }}>2. Analyze</span>
        <span style={{ color: currentStep === 3 ? "blue" : "gray" }}>3. Refine</span>
        <span style={{ color: currentStep === 4 ? "blue" : "gray" }}>4. Export</span>
      </div>

      {statusMsg && <div style={{ padding: "10px", background: "#eee", margin: "10px 0" }}>{statusMsg}</div>}
      {loading && <p>Loading...</p>}

      {/* ================= STEP 1: INGEST ================= */}
      {currentStep === 1 && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>Step 1: Ingest Profile</h2>
          <form onSubmit={handleProcessCv}>
            <p>Upload legacy CV (PDF):</p>
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
            <br /><br />
            <button type="submit" disabled={loading || !file}>Upload & Extract via AI</button>
          </form>
        </div>
      )}

      {/* ================= STEP 2: ANALYZE ================= */}
      {currentStep === 2 && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>Step 2: Target Opportunity Analysis</h2>
          
          <div style={{ marginBottom: "15px" }}>
            <h3>Extracted Experiences ({experiences.length}) & Projects ({projects.length})</h3>
            <button onClick={handleSaveManualEntries}>Confirm & Save to Database</button>
          </div>

          <form onSubmit={handleAnalyzeJD}>
            <p>Paste Job Description:</p>
            <textarea
              rows={5}
              style={{ width: "100%" }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste target job requirements here..."
              required
            />
            <br /><br />
            <button type="submit" disabled={loading}>Run Vector Retrieval & Match</button>
          </form>
        </div>
      )}

      {/* ================= STEP 3: REVIEW & REFINE ================= */}
      {currentStep === 3 && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>Step 3: Review Chunks & Synthesize</h2>
          <p>Retrieved Top-K Vector Matches: {retrievedContext.length}</p>
          
          <div style={{ background: "#f9f9f9", padding: "10px", maxHeight: "150px", overflowY: "auto", marginBottom: "15px" }}>
            {retrievedContext.map((chunk, idx) => (
              <p key={idx} style={{ fontSize: "12px", borderBottom: "1px solid #ddd" }}>{chunk.content || JSON.stringify(chunk)}</p>
            ))}
          </div>

          <button onClick={handleGenerateAndCompile} disabled={loading}>
            Generate Tailored Content & Compile PDF
          </button>
        </div>
      )}

      {/* ================= STEP 4: EXPORT ================= */}
      {currentStep === 4 && (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>Step 4: Preview & Export</h2>
          
          {pdfUrl && (
            <div style={{ margin: "15px 0" }}>
              <iframe src={pdfUrl} title="PDF Preview" style={{ width: "100%", height: "400px" }} />
              <br /><br />
              <a href={pdfUrl} download="tailored_resume.pdf" style={{ padding: "10px 20px", background: "blue", color: "white", textDecoration: "none" }}>
                Download Compiled PDF
              </a>
            </div>
          )}

          <br />
          <button onClick={() => setCurrentStep(1)}>Start Over</button>
        </div>
      )}
    </div>
  );
}