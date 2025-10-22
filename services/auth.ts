import http from "./http";
import { AuthUser, ApiResponse, RegisterInput, LoginInput } from "@/types/auth";

export async function postRegister(
  formData: RegisterInput
): Promise<ApiResponse<AuthUser>> {
  const response = await http.post("/register", formData);
  return response.data;
}

export async function postLogin(
  formData: LoginInput
): Promise<ApiResponse<AuthUser>> {
  const response = await http.post("/login", formData);
  return response.data;
}
