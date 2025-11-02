"use client";

import { QueryClient, MutationCache, QueryKey } from "@tanstack/react-query";
import { toast } from "sonner";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      additionalDescription?: string;
      errorMessage?: string;
    };
    defaultError: {
      message: string;
      status: number;
      response?: {
        data?: any;
        message: string;
        error?: any;
        status: string;
      } 
    };
  }
}


export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta?.invalidatesQuery,
          });
        }
        toast.success(mutation.meta?.successMessage || "Successful!.", {
          description: mutation.meta?.additionalDescription,
        });
      },
      onError: (_error, _variables, _context, mutation) => {
        toast.error(mutation.meta?.errorMessage || "An error occured.", {
          description: _error.response?.data?.message,
        });
      },
      onSettled: (_data, _error, _variables, _context, mutation) => {},
    }),
});
