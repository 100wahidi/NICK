import { z } from "zod";

// ─── Shared Primitives ──────────────────────────────────────────
export const stringListSchema = z
  .array(z.string())
  .nullish()
  .transform((val) => val ?? []);

export type StringListSchema = z.infer<typeof stringListSchema>;

// ─── 1. Offer Extraction Domain ─────────────────────────────────
export const JobOfferInsightsSchema = z.object({
  title: z.string().default(""),
  technical_skills: stringListSchema,
  required_experiences: stringListSchema,
  non_technical_skills: stringListSchema,
  motivations: stringListSchema,
  keywords: stringListSchema,
});

export type JobOfferInsights = z.infer<typeof JobOfferInsightsSchema>;

export const OfferExtractionResponseSchema = z.object({
  offer_key_insights: JobOfferInsightsSchema,
});

export type OfferExtractionResponse = z.infer<typeof OfferExtractionResponseSchema>;

// ─── 2. CV Extraction Domain (Matches FastAPI /process-cv) ─────
export const ExtractedProjectSchema = z
  .object({
    title: z.string().nullish().default(""),
    description: z.string().nullish().default(""),
    skills: stringListSchema,
    technologies: stringListSchema,
    keywords: stringListSchema,
  })
  .passthrough();

export type ExtractedProject = z.infer<typeof ExtractedProjectSchema>;

export const ExtractedExperienceSchema = z
  .object({
    title: z.string().nullish().default(""),
    company: z.string().nullish().default(""),
    role: z.string().nullish().default(""),
    description: z.string().nullish().default(""),
    skills: stringListSchema,
    technologies: stringListSchema,
    keywords: stringListSchema,
  })
  .passthrough();

export type ExtractedExperience = z.infer<typeof ExtractedExperienceSchema>;

export const ExtractionLLMResponseSchema = z
  .object({
    experiences: z
      .array(ExtractedExperienceSchema)
      .nullish()
      .transform((val) => val ?? []),
    projects: z
      .array(ExtractedProjectSchema)
      .nullish()
      .transform((val) => val ?? []),
    skills: stringListSchema,
  })
  .passthrough();

export type ExtractionLLMResponse = z.infer<typeof ExtractionLLMResponseSchema>;

export const ExtractionResponseSchema = z.object({
  status: z.string(),
  experiences_count: z.number().nullish().default(0),
  projects_count: z.number().nullish().default(0),
  data: ExtractionLLMResponseSchema,
});

export type ExtractionResponse = z.infer<typeof ExtractionResponseSchema>;

// Alias for backwards compatibility if needed
export type CvExtractionResponseSchema = ExtractionResponse;

// ─── 3. Form Validation Schemas ─────────────────────────────────
export const ManualSkillInputSchema = z.object({
  skill: z
    .string()
    .trim()
    .min(1, "Skill cannot be empty")
    .max(50, "Skill is too long"),
});

export type ManualSkillInput = z.infer<typeof ManualSkillInputSchema>;

// ─── 4. Retrieval Schemas ─────────────────────────────────────────
export const MatchItemSchema = z.union([
  z.string(),
  z
    .object({
      title: z.string().optional(),
      name: z.string().optional(),
      content: z.string().optional(),
      description: z.string().optional(),
    })
    .passthrough(),
]);

export type MatchItem = z.infer<typeof MatchItemSchema>;

const retrievalEnvelopeSchema = z.object({
  best_projects: z.array(MatchItemSchema).optional(),
  best_experiences: z.array(MatchItemSchema).optional(),
  results: z.array(MatchItemSchema).optional(),
  matches: z.array(MatchItemSchema).optional(),
  chunks: z.array(MatchItemSchema).optional(),
  data: z.array(MatchItemSchema).optional(),
});

export const ProjectRetrievalResponseSchema = z.union([
  z.array(MatchItemSchema),
  retrievalEnvelopeSchema.transform(
    (value) => value.best_experiences || value.results || value.matches || value.chunks || value.data || []
  ),
]);

export const ExperienceRetrievalResponseSchema = z.union([
  z.array(MatchItemSchema),
  retrievalEnvelopeSchema.transform(
    (value) => value.best_experiences || value.results || value.matches || value.chunks || value.data || []
  ),
]);

export const RetrievalResponseSchema = z.union([
  z.array(MatchItemSchema),
  retrievalEnvelopeSchema
    .transform(
      (val) => val.best_projects || val.best_experiences || val.results || val.matches || val.chunks || val.data || []
    ),
]);

export type RetrievalResponse = z.infer<typeof RetrievalResponseSchema>;
