import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  confirmResetPassword,
  postLogin,
  postRegister,
  postResetPassword,
  verifyResetToken,
} from "@/services/auth";
import {
  AuthUser,
  ApiResponse,
  RegisterInput,
  LoginInput,
  ResetPasswordInput,
  VerifyResetInput,
  ConfirmResetInput,
} from "@/types/auth";

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
      additionalDescription: "You are being redirected...",
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

/* Reset Password */
export function useResetPassword(
  options?: UseMutationOptions<
    ApiResponse<AuthUser>,
    Error,
    ResetPasswordInput,
    unknown
  >
) {
  return useMutation({
    mutationFn: postResetPassword,
    meta: {
      successMessage: "Reset link sent successfully",
      additionalDescription: "Check your inbox for the password reset link.",
      errorMessage: "Error sending reset link",
    },
    ...options,
  });
}

/* Verify Reset Token */
export function useVerifyReset(
  options?: UseMutationOptions<
    ApiResponse<null>,
    Error,
    VerifyResetInput,
    unknown
  >
) {
  return useMutation({
    mutationFn: verifyResetToken,
    meta: {
      successMessage: "Token verified",
      errorMessage: "Invalid or expired token",
    },
    ...options,
  });
}

/* Confirm New Password */
export function useConfirmReset(
  options?: UseMutationOptions<
    ApiResponse<null>,
    Error,
    ConfirmResetInput,
    unknown
  >
) {
  return useMutation({
    mutationFn: confirmResetPassword,
    meta: {
      successMessage: "Password reset successfully",
      errorMessage: "Failed to reset password",
    },
    ...options,
  });
}
