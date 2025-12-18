import { useState, useCallback } from 'react';
import { 
  servers as mockServers, 
  getChannelsForServer, 
  getMembersForServer, 
  getMessagesForChannel,
  getChannelById,
  getServerById,
  currentUser 
} from '../data/mockData';

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

    setMessages(prev => [...prev, newMessage]);

    // TODO: Replace with actual API call
    // await api.sendMessage(channelId, content);
  }, []);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    // TODO: Replace with actual API call
    // const data = await api.getMessages(channelId);
    const data = getMessagesForChannel(channelId);
    setMessages(data);
    setIsLoading(false);
  }, [channelId]);

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

    // TODO: Replace with actual API call
    // await api.addReaction(messageId, emoji);
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
