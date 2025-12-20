import { apiFetch } from "../utils/apiClient";

export function getFriends() {
  return apiFetch("/friends/");
}

export function sendFriendRequest(userId) {
  return apiFetch("/friends/request/", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}

export function acceptFriendRequest(requestId) {
  return apiFetch("/friends/accept/", {
    method: "POST",
    body: JSON.stringify({ request_id: requestId }),
  });
}

export function removeFriend(friendId) {
  return apiFetch(`/friends/${friendId}/`, {
    method: "DELETE",
  });
}