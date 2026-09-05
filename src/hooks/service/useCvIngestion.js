import { useMutation } from "@tanstack/react-query";
import { extractionAPI } from "../../API_Settings/api";
import { ExtractionResponseSchema } from "../../pages/schemas/extraction";

export function useCvIngestion(options = {}) {
  return useMutation({
    mutationFn: async (file) => {
      const response = await extractionAPI.processCv(file, true);
      return ExtractionResponseSchema.parse(response);
    },
    ...options,
  });
}
