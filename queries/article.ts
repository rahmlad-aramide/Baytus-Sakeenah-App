import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  getArticles,
  getManagedArticles,
  postArticle,
} from "@/services/article";
import { Article, ArticleInput, ArticleResponse } from "@/types/article";
import { ApiResponse } from "@/types/auth";

/* Get Article */
export function useArticles() {
  return useQuery<Article[], Error>({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
}

/* Post Article */
export function usePostArticle(
  options?: UseMutationOptions<
    ApiResponse<ArticleResponse>,
    Error,
    ArticleInput
  >
) {
  return useMutation({
    mutationFn: postArticle,
    meta: {
      successMessage: "Article created successfully!",
      errorMessage: "Failed to create article",
    },
    ...options,
  });
}

/* Manage Articles */
export function useManagedArticles() {
  return useQuery({
    queryKey: ["managedArticles"],
    queryFn: getManagedArticles,
  });
}
