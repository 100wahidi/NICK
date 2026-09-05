import React from "react";

const ROW_1 = [
  "Jane Street",
  "Tailored LaTeX",
  "J.P. Morgan",
  "FastAPI",
  "Goldman Sachs",
  "RAG Retrieval",
  "Google",
  "Mistral AI",
  "Morgan Stanley",
  "ATS Optimized",
];

const ROW_2 = [
  "Full-Stack Engineer",
  "Machine Learning",
  "Quantitative Research",
  "pgvector",
  "Software Engineer",
  "Data Science",
  "High Yield",
  "Fixed Income",
  "ModernCV",
  "Top-K Chunks",
];

const ROW_3 = [
  "Instant Compilation",
  "Amazon",
  "Vector Similarity",
  "Microsoft",
  "Jinja2 Sandboxing",
  "Hedge Funds",
  "Clean Architecture",
  "Bloomberg",
];

export default function FloatingWords() {
  return (
    <div className="floating-words-wrapper" aria-hidden="true">
      {/* Row 1: Left to Right */}
      <div className="ticker-track track-left">
        {[...ROW_1, ...ROW_1].map((word, idx) => (
          <span key={`r1-${idx}`} className="floating-chip">
            {word}
          </span>
        ))}
      </div>

      {/* Row 2: Right to Left */}
      <div className="ticker-track track-right">
        {[...ROW_2, ...ROW_2].map((word, idx) => (
          <span key={`r2-${idx}`} className="floating-chip highlight">
            {word}
          </span>
        ))}
      </div>

      {/* Row 3: Left to Right */}
      <div className="ticker-track track-left-slow">
        {[...ROW_3, ...ROW_3].map((word, idx) => (
          <span key={`r3-${idx}`} className="floating-chip">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}