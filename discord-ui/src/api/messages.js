import { apiFetch } from "../utils/apiClient";

export function getDialogMessages(dialogId) {
  return apiFetch(`/messages/?dialog_id=${dialogId}`);
}

export function sendMessage(dialogId, text, file = null) {
  const formData = new FormData();
  formData.append("dialog", dialogId);
  formData.append("text", text);
  if (file) formData.append("file", file);

  return apiFetch("/messages/send/", {
    method: "POST",
    body: formData,
  });
}