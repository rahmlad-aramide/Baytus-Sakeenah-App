import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/services/profile";
import { ApiResponse } from "@/types/auth";
import { ProfileResponse, EditProfileInput } from "@/types/profile";


/* Get Profile */
export function useProfile() {
  return useQuery<ApiResponse<ProfileResponse>, Error>({
    queryKey: ["profile"],
    queryFn: getProfile,
});
}

/* Update Profile */
export function useUpdateProfile(
  options?: UseMutationOptions<
    ApiResponse<ProfileResponse>,
    Error,
    EditProfileInput
  >
) {
  return useMutation({
   mutationFn: updateProfile,
    meta: {
      successMessage: "Profile Updated!",
      additionalDescription: "Your profile has been updated successfully.",
      errorMessage: "Error updating profile",
    },
    ...options,
});
}