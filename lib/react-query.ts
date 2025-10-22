"use client";

import { QueryClient, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _vars, _context, mutation) => {
      toast.success(mutation.meta?.successMessage || "Successful!", {
        description: mutation.meta?.additionalDescription,
      });
    },
    onError: (_error, _vars, _context, mutation) => {
      toast.error(mutation.meta?.errorMessage || "An error occurred", {
        description:
          (_error as any)?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    },
  }),
});
