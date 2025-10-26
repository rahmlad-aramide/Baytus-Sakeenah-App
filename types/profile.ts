export interface ProfileResponse {
  display_name: string;
  bio: string;
  location: string;
  gender: string;
  age: number | null;
  marital_status: string;
  profile_visibility: boolean;
  show_real_name: boolean;
}

export interface EditProfileInput {
  display_name?: string;
  bio?: string;
  location?: string;
  gender?: string;
  age?: number;
  marital_status?: string;
  profile_visibility?: boolean;
  show_real_name?: boolean;
}
