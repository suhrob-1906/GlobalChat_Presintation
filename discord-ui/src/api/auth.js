import { apiFetch } from "../utils/apiClient";

export function register(data) {
  // Если это FormData - не устанавливаем Content-Type
  // Если это объект - преобразуем в JSON
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
    formData.append(key, data[key]);
  });

  return apiFetch("/auth/profile/me/update/", {
    method: "PATCH",
    body: formData,
  });
}