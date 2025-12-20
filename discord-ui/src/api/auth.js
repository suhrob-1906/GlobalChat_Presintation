import { apiFetch } from "../utils/apiClient";

export function register(data) {
  // Проверяем что это - FormData или объект
  const body = data instanceof FormData ? data : JSON.stringify(data);
  
  return apiFetch("/auth/register/", {
    method: "POST",
    body: body,
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
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  return apiFetch("/auth/profile/me/update/", {
    method: "PATCH",
    body: formData,
  });
}