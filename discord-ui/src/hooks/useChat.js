import { useState, useCallback } from 'react';
import {
  servers as mockServers,
  getChannelsForServer,
  getMembersForServer,
  getMessagesForChannel,
  getChannelById,
  getServerById,
  currentUser,
} from '../data/mockData';

const API_BASE = 'https://globalchat-presintation.render.com/api';

function mapApiMessageToUi(msg) {
  return {
    id: msg.id,
    author: {
      id: msg.sender?.user_id || null,
      username: msg.sender?.username || msg.sender?.user_id || 'Unknown',
      avatar: msg.sender?.avatar || null,
    },
    content: msg.text || '',
    timestamp: msg.created_at || new Date().toISOString(),
    reactions: [],
  };
}

export function useChat(serverId, channelId) {
  const [messages, setMessages] = useState(() => getMessagesForChannel(channelId));
  const [isLoading, setIsLoading] = useState(false);

  const server = getServerById(serverId);
  const categories = getChannelsForServer(serverId);
  const members = getMembersForServer(serverId);
  const channel = getChannelById(serverId, channelId);

  const sendMessage = useCallback((content) => {
    if (!content.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content: content.trim(),
      timestamp: new Date().toISOString(),
      reactions: [],
    };

    setMessages((prev) => [...prev, newMessage]);

    // Try sending to API if token present
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        await fetch(`${API_BASE}/messages/send/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dialog: channelId, text: content.trim() }),
        });
      } catch (err) {
        // keep optimistic update; optionally handle error
      }
    })();
  }, [channelId]);

  const loadMessages = useCallback(
    async (force = false) => {
      setIsLoading(true);

      const token = localStorage.getItem('access_token');

      if (token) {
        try {
          const res = await fetch(`${API_BASE}/messages/?dialog_id=${channelId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (res.ok) {
            const data = await res.json();
            const mapped = (data || []).map(mapApiMessageToUi);
            setMessages(mapped);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          // fallthrough to mock
        }
      }

      // Fallback to mock data
      const data = getMessagesForChannel(channelId);
      setMessages(data);
      setIsLoading(false);
    },
    [channelId]
  );

  const addReaction = useCallback((messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id !== messageId) return msg;
      
      const existingReaction = msg.reactions.find(r => r.emoji === emoji);
      if (existingReaction) {
        return {
          ...msg,
          reactions: msg.reactions.map(r => 
            r.emoji === emoji 
              ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
              : r
          ).filter(r => r.count > 0)
        };
      }
      
      return {
        ...msg,
        reactions: [...msg.reactions, { emoji, count: 1, reacted: true }]
      };
    }));

    // No reactions endpoint in current API; keep optimistic local update.
  }, []);

  return {
    server,
    channel,
    categories,
    members,
    messages,
    isLoading,
    currentUser,
    servers: mockServers,
    sendMessage,
    loadMessages,
    addReaction,
  };
}

export function useServers() {
  const [servers] = useState(mockServers);
  
  // TODO: Replace with actual API call
  // useEffect(() => { loadServers() }, []);

  return { servers };
}