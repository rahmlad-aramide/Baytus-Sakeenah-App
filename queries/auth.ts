import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authKeys } from "@/queries/query-keys";
import { postLogin, postRegister } from "@/services/auth";
import { AuthUser, ApiResponse, RegisterInput, LoginInput } from "@/types/auth";

/* Register */
export function useRegister(
  options?: UseMutationOptions<
    ApiResponse<AuthUser>,
    Error,
    RegisterInput,
    unknown
  >
) {
  return useMutation({
    mutationFn: postRegister,
    meta: {
      successMessage: "Registration successful",
      additionalDescription: "You are being redirected to verify your email.",
      errorMessage: "Error creating your account",
    },
    ...options,
  });
}

/* Login */
export function useLogin(
  options?: UseMutationOptions<
    ApiResponse<AuthUser>,
    Error,
    LoginInput,
    unknown
  >
) {
  return useMutation({
    mutationFn: postLogin,
    meta: {
      successMessage: "Logged in successfully",
      additionalDescription: "You are being redirected...",
      errorMessage: "Error logging in",
    },
    ...options,
  });
}
