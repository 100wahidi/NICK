import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import OfferExtractionStep from "../components/services/OfferExtractionStep";
import SkillsEnrichmentStep from "../components/services/SkillsEnrichmentStep";
import MatchSelectionStep from "../components/services/MatchSelectionStep";
import GeneratedCvStep from "../components/services/GeneratedCvStep";
import WorkflowLoading from "../components/services/WorkflowLoading";
import { useOfferExtraction } from "../hooks/service/useOfferExtraction";
import { useCvIngestion } from "../hooks/service/useCvIngestion";
import { useMatchRetrieval } from "../hooks/service/useMatchRetrieval";
import { useCvGeneration } from "../hooks/service/useCvGeneration";
import { uploadAPI } from "../API_Settings/api";

const initialInsights = {
  title: "",
  technical_skills: [],
  required_experiences: [],
  non_technical_skills: [],
  motivations: [],
  keywords: [],
};

const getMessage = (error, fallback) => error?.message || fallback;

function normalizeMatches(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeMatchText(value) {
  return String(value || "").trim().toLowerCase();
}

function isManualEntryMatch(item, entries) {
  const itemTitle = normalizeMatchText(typeof item === "string" ? item : item?.title || item?.name);
  const itemContent = normalizeMatchText(typeof item === "string" ? item : item?.content || item?.description);

  return entries.some((entry) => (
    normalizeMatchText(entry.title) === itemTitle &&
    normalizeMatchText(entry.content) === itemContent
  ));
}

export default function ServiceWorkflowPage() {
  const [step, setStep] = useState(1);
  const [jobOffer, setJobOffer] = useState("");
  const [offerInsights, setOfferInsights] = useState(initialInsights);
  const [manualSkill, setManualSkill] = useState("");
  const [manualSkills, setManualSkills] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [cvStats, setCvStats] = useState(null);
  const [manualEntries, setManualEntries] = useState({ experiences: [], projects: [] });
  const [savingEntryType, setSavingEntryType] = useState(null);
  const [matches, setMatches] = useState({ projects: [], experiences: [] });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState("");
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  const projectSkills = useMemo(
    () => [...new Set([...offerInsights.technical_skills, ...manualSkills])],
    [offerInsights.technical_skills, manualSkills]
  );

  const extractOffer = useOfferExtraction({
    onSuccess: (data) => {
      setOfferInsights(data.offer_key_insights);
      setFeedback({ error: "", success: "Job offer analyzed successfully." });
      setStep(2);
    },
    onError: (error) => setFeedback({ error: getMessage(error, "Offer extraction failed."), success: "" }),
  });

  const ingestCv = useCvIngestion({
    onSuccess: (data) => {
      setCvStats({ experiencesCount: data.experiences_count, projectsCount: data.projects_count });
      setFeedback({
        error: "",
        success: `Parsed and indexed ${data.experiences_count} experiences and ${data.projects_count} projects.`,
      });
    },
    onError: (error) => setFeedback({ error: getMessage(error, "CV extraction failed."), success: "" }),
  });

  const retrieveMatches = useMatchRetrieval({
    onSuccess: (data) => {
      const projects = normalizeMatches(data.projects).filter(
        (item) => !isManualEntryMatch(item, manualEntries.projects)
      );
      const experiences = normalizeMatches(data.experiences).filter(
        (item) => !isManualEntryMatch(item, manualEntries.experiences)
      );
      setMatches({ projects, experiences });
      setSelectedProjects(projects.map((_, index) => index));
      setSelectedExperiences(experiences.map((_, index) => index));
      setFeedback({ error: "", success: "Matched projects and experiences retrieved." });
      setStep(3);
    },
    onError: (error) => setFeedback({ error: getMessage(error, "Retrieval failed."), success: "" }),
  });

  const generateCv = useCvGeneration({
    onSuccess: (pdfBlob) => {
      setGeneratedPdfUrl((previousUrl) => {
        if (previousUrl) URL.revokeObjectURL(previousUrl);
        return URL.createObjectURL(pdfBlob);
      });
      setFeedback({ error: "", success: "Tailored CV successfully generated." });
      setStep(4);
    },
    onError: (error) => setFeedback({ error: getMessage(error, "CV generation failed."), success: "" }),
  });

  useEffect(() => {
    return () => {
      if (generatedPdfUrl) URL.revokeObjectURL(generatedPdfUrl);
    };
  }, [generatedPdfUrl]);

  const isPending = extractOffer.isPending || ingestCv.isPending || retrieveMatches.isPending || generateCv.isPending;
  const activeError = feedback.error || extractOffer.error?.message || ingestCv.error?.message || retrieveMatches.error?.message || generateCv.error?.message;

  const handleExtract = (event) => {
    event.preventDefault();
    const text = jobOffer.trim();
    if (!text) {
      setFeedback({ error: "Please enter a job description first.", success: "" });
      return;
    }
    setFeedback({ error: "", success: "" });
    extractOffer.mutate(text);
  };

  const handleCvUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFeedback({ error: "Only PDF files are supported.", success: "" });
      return;
    }
    setCvFile(file);
    setFeedback({ error: "", success: "" });
    ingestCv.mutate(file);
  };

  const handleAddManualEntry = async (type, entry) => {
    setSavingEntryType(type);
    try {
      const saveEntry = type === "experiences" ? uploadAPI.addExperience : uploadAPI.addProject;
      await saveEntry({ [type]: [entry] });
      setManualEntries((current) => ({
        ...current,
        [type]: [...current[type], entry],
      }));
      setFeedback({ error: "", success: `${type === "experiences" ? "Experience" : "Project"} added to your profile.` });
    } catch (error) {
      setFeedback({ error: getMessage(error, `Could not save this ${type === "experiences" ? "experience" : "project"}.`), success: "" });
      throw error;
    } finally {
      setSavingEntryType(null);
    }
  };

  const handleContinue = async () => {
    handleRetrieve();
  };

  const handleAddSkill = (event) => {
    event.preventDefault();
    const skill = manualSkill.trim();
    if (!skill || projectSkills.some((item) => item.toLowerCase() === skill.toLowerCase())) return;
    setManualSkills((current) => [...current, skill]);
    setManualSkill("");
  };

  const handleRetrieve = () => {
    setFeedback({ error: "", success: "" });
    retrieveMatches.mutate({
      projectSkills,
      requiredExperiences: offerInsights.required_experiences,
    });
  };

  const handleGenerate = () => {
    const selectedProjectsPayload = selectedProjects.map((index) => matches.projects[index]).filter(Boolean);
    const selectedExperiencesPayload = selectedExperiences.map((index) => matches.experiences[index]).filter(Boolean);

    generateCv.mutate({
      offer_extraction: offerInsights,
      best_projects: { projects: selectedProjectsPayload },
      best_experiences: { experiences: selectedExperiencesPayload },
    });
  };

  const toggleIndex = (setter) => (index) => {
    setter((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[#0B0D10] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {(activeError || feedback.success) && (
          <div className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm ${activeError ? "border-rose-500/30 bg-rose-500/10 text-rose-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}`}>
            {activeError ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            <span>{activeError || feedback.success}</span>
          </div>
        )}

        {extractOffer.isPending && (
          <WorkflowLoading
            title="Analyzing the job offer"
            description="We are extracting the target role, technical skills, experience requirements, and keywords from the offer."
          />
        )}

        {!isPending && step === 1 && (
          <OfferExtractionStep value={jobOffer} onChange={setJobOffer} onSubmit={handleExtract} loading={isPending} />
        )}

        {!isPending && step === 2 && (
          <SkillsEnrichmentStep
            insights={offerInsights}
            projectSkills={projectSkills}
            manualSkill={manualSkill}
            onManualSkillChange={setManualSkill}
            onAddSkill={handleAddSkill}
            onRemoveSkill={(skill) => setManualSkills((current) => current.filter((item) => item !== skill))}
            cvFile={cvFile}
            cvStats={cvStats}
            manualEntries={manualEntries}
            uploading={ingestCv.isPending}
            savingEntryType={savingEntryType}
            onUploadCv={handleCvUpload}
            onAddManualEntry={handleAddManualEntry}
            onBack={() => setStep(1)}
            onContinue={handleContinue}
          />
        )}

        {ingestCv.isPending && (
          <WorkflowLoading
            title="Reading your CV"
            description="We are extracting your skills, experiences, and projects to enrich your matching profile."
          />
        )}

        {retrieveMatches.isPending && (
          <WorkflowLoading
            title="Finding your strongest matches"
            description="We are comparing the offer requirements with your projects and professional experiences."
          />
        )}

        {generateCv.isPending && (
          <WorkflowLoading
            title="Generating your tailored resume"
            description="We are assembling your selected experience into a recruiter-ready PDF."
          />
        )}

        {!isPending && step === 3 && (
          <MatchSelectionStep
            matches={matches}
            selectedProjects={selectedProjects}
            selectedExperiences={selectedExperiences}
            onToggleProject={toggleIndex(setSelectedProjects)}
            onToggleExperience={toggleIndex(setSelectedExperiences)}
            onBack={() => setStep(2)}
            onGenerate={handleGenerate}
            loading={retrieveMatches.isPending || generateCv.isPending}
          />
        )}

        {!isPending && step === 4 && (
          <GeneratedCvStep
            pdfUrl={generatedPdfUrl}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </section>
  );
}
