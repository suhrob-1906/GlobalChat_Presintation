
import { apiFetch } from "../utils/apiClient";

export function searchUsers(query) {
  return apiFetch(`/auth/users/search/?q=${encodeURIComponent(query)}`);
}

export function getUser(userId) {
  return apiFetch(`/auth/users/${userId}/`);
}

export function sendFriendRequest(userId) {
  return apiFetch("/friends/request/", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}

export function getFriends() {
  return apiFetch("/friends/");
}

export function removeFriend(friendId) {
  return apiFetch(`/friends/${friendId}/`, {
    method: "DELETE",
  });
}