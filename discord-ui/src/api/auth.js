import { apiFetch } from "../utils/apiClient";

export function register(data) {
  return apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(credentials) {
  return apiFetch("/auth/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getMe() {
  return apiFetch("/auth/me/");
}

export function updateProfile(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  return apiFetch("/auth/profile/me/update/", {
    method: "PATCH",
    body: formData,
  });
}