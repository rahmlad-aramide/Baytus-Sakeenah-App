import http from "./http";
import { ProfileResponse, EditProfileInput } from "@/types/profile";
import { ApiResponse } from "@/types/auth";

/* Get Profile */
export async function getProfile(): Promise<ApiResponse<ProfileResponse>> {
  const response = await http.get("/profile/update/");
  return response.data;
}

/* Update Profile */
export async function updateProfile(
  formData: EditProfileInput
): Promise<ApiResponse<ProfileResponse>> {
  const response = await http.patch("/profile/update/", formData);
  return response.data;
}
