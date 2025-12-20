import { apiFetch } from "../utils/apiClient";

export function getDialogs() {
  return apiFetch("/dialogs/");
}

export function createDialog(type, memberIds, title = "") {
  return apiFetch("/dialogs/", {
    method: "POST",
    body: JSON.stringify({
      type,
      members: memberIds,
      title,
    }),
  });
}