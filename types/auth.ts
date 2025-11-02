export interface AuthUser {
  refresh: string;
  access: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string | string[]> | null;
}

export interface RegisterInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  marital_status: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface ResetPasswordInput {
  email: string;
}

export interface VerifyResetInput {
  token: string;
  email: string;
}

export interface ConfirmResetInput {
  token: string;
  email: string;
  password: string;
  confirm_password: string;
}
