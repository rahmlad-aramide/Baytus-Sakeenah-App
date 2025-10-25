import http from "./http";
import {
  AuthUser,
  ApiResponse,
  RegisterInput,
  LoginInput,
  ResetPasswordInput,
  VerifyResetInput,
  ConfirmResetInput,
} from "@/types/auth";

/*Register */
export async function postRegister(
  formData: RegisterInput
): Promise<ApiResponse<AuthUser>> {
  const response = await http.post("/register", formData);
  return response.data;
}

/* Login */
export async function postLogin(
  formData: LoginInput
): Promise<ApiResponse<AuthUser>> {
  const response = await http.post("/login", formData);
  return response.data;
}

/* Request reset link */
export async function postResetPassword(
  formData: ResetPasswordInput
): Promise<ApiResponse<AuthUser>> {
  const response = await http.post("/reset-password/request", formData);
  return response.data;
}

/* Verify reset token */
export async function verifyResetToken(
  formData: VerifyResetInput
): Promise<ApiResponse<null>> {
  const response = await http.post("/reset-password/verify", formData);
  return response.data;
}

/* Confirm new password */
export async function confirmResetPassword(
  formData: ConfirmResetInput
): Promise<ApiResponse<null>> {
  const response = await http.post("/reset-password/confirm", formData);
  return response.data;
}
