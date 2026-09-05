import { useMutation } from "@tanstack/react-query";
import { retrievalAPI } from "../../API_Settings/api";
import { OfferExtractionResponseSchema } from "../../pages/schemas/extraction";

export function useOfferExtraction(options = {}) {
  return useMutation({
    mutationFn: async (jobOffer) => {
      const response = await retrievalAPI.extractOffer(jobOffer);
      return OfferExtractionResponseSchema.parse(response);
    },
    ...options,
  });
}
