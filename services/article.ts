import http from "./http";
import { Article, ArticleInput, ArticleResponse } from "@/types/article";
import { ApiResponse } from "@/types/auth";

/* Get Article */
export async function getArticles(): Promise<Article[]> {
  const response = await http.get<Article[]>("/article/");
  return response.data;
}

/* Post Article */
export async function postArticle(
  formData: ArticleInput
): Promise<ApiResponse<ArticleResponse>> {
  const response = await http.post("/article/", formData);
  return response.data;
}

/* Get Article Manage List */
export async function getManagedArticles(): Promise<
  ApiResponse<ArticleResponse[]>
> {
  const response = await http.get("/article/manage/");
  return response.data;
}
