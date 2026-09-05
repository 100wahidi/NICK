import { useMutation } from "@tanstack/react-query";
import { generationAPI } from "../../API_Settings/api";

export function useCvGeneration(options = {}) {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await generationAPI.getCv(payload);

      if (!(response instanceof Blob)) {
        throw new Error("The generation endpoint did not return a PDF file.");
      }

      return response;
    },
    ...options,
  });
}
