import { apiRequest } from "./api";

export function getMyProfile() {
  return apiRequest("/auth/profile/me/");
}

export function updateProfile(data) {
  return apiRequest("/auth/profile/me/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}