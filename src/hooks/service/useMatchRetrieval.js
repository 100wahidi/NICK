import { useMutation } from "@tanstack/react-query";
import { retrievalAPI } from "../../API_Settings/api";
import {
  ProjectRetrievalResponseSchema,
  ExperienceRetrievalResponseSchema,
} from "../../pages/schemas/extraction";

export function useMatchRetrieval(options = {}) {
  return useMutation({
    mutationFn: async (payload) => {
      const [projects, experiences] = await Promise.all([
        retrievalAPI.retrieveProjects({ technical_skills: payload.projectSkills }),
        retrievalAPI.retrieveExperiences({ required_experiences: payload.requiredExperiences }),
      ]);

      return {
        projects: ProjectRetrievalResponseSchema.parse(projects),
        experiences: ExperienceRetrievalResponseSchema.parse(experiences),
      };
    },
    ...options,
  });
}
