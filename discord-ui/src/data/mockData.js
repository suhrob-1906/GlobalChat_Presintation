export const currentUser = {
  id: 'user-1',
  username: 'You',
  discriminator: '0001',
  avatar: null,
  status: 'online',
};

export const servers = [
  {
    id: 'home',
    name: 'Direct Messages',
    icon: null,
    isHome: true,
  },
  {
    id: 'server-1',
    name: 'GlobalChat',
    icon: 'G',
    color: '#5865F2',
  },
  {
    id: 'server-2',
    name: 'Development',
    icon: 'D',
    color: '#57F287',
  },
  {
    id: 'server-3',
    name: 'Design Team',
    icon: 'DT',
    color: '#EB459E',
  },
];

export const channels = {
  'server-1': {
    categories: [
      {
        id: 'cat-1',
        name: 'Information',
        channels: [
          { id: 'ch-1', name: 'welcome', type: 'text', unread: false },
          { id: 'ch-2', name: 'rules', type: 'text', unread: false },
          { id: 'ch-3', name: 'announcements', type: 'text', unread: true },
        ],
      },
      {
        id: 'cat-2',
        name: 'Text Channels',
        channels: [
          { id: 'ch-4', name: 'general', type: 'text', unread: true },
          { id: 'ch-5', name: 'off-topic', type: 'text', unread: false },
          { id: 'ch-6', name: 'help', type: 'text', unread: false },
        ],
      },
      {
        id: 'cat-3',
        name: 'Voice Channels',
        channels: [
          { id: 'vc-1', name: 'General', type: 'voice', users: [] },
          { id: 'vc-2', name: 'Gaming', type: 'voice', users: ['user-2'] },
          { id: 'vc-3', name: 'Music', type: 'voice', users: [] },
        ],
      },
    ],
  },
  'server-2': {
    categories: [
      {
        id: 'cat-4',
        name: 'Development',
        channels: [
          { id: 'ch-7', name: 'frontend', type: 'text', unread: false },
          { id: 'ch-8', name: 'backend', type: 'text', unread: true },
          { id: 'ch-9', name: 'devops', type: 'text', unread: false },
        ],
      },
    ],
  },
  'server-3': {
    categories: [
      {
        id: 'cat-5',
        name: 'Design',
        channels: [
          { id: 'ch-10', name: 'ui-ux', type: 'text', unread: false },
          { id: 'ch-11', name: 'feedback', type: 'text', unread: false },
        ],
      },
    ],
  },
};

export const members = {
  'server-1': [
    { id: 'user-1', username: 'You', discriminator: '0001', status: 'online', role: 'Admin' },
    { id: 'user-2', username: 'Alice', discriminator: '1234', status: 'online', role: 'Moderator' },
    { id: 'user-3', username: 'Bob', discriminator: '5678', status: 'idle', role: 'Member' },
    { id: 'user-4', username: 'Charlie', discriminator: '9012', status: 'dnd', role: 'Member' },
    { id: 'user-5', username: 'Diana', discriminator: '3456', status: 'offline', role: 'Member' },
    { id: 'user-6', username: 'Eve', discriminator: '7890', status: 'online', role: 'Member' },
  ],
};

export const messages = {
  'ch-4': [
    {
      id: 'msg-1',
      author: { id: 'user-2', username: 'Alice', avatar: null },
      content: 'Hey everyone! Welcome to GlobalChat 👋',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      reactions: [{ emoji: '👋', count: 3, reacted: true }],
    },
    {
      id: 'msg-2',
      author: { id: 'user-3', username: 'Bob', avatar: null },
      content: 'Thanks! This looks amazing.',
      timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      reactions: [],
    },
    {
      id: 'msg-3',
      author: { id: 'user-2', username: 'Alice', avatar: null },
      content: 'The new UI is really coming together nicely!',
      timestamp: new Date(Date.now() - 3600000 * 1.4).toISOString(),
      reactions: [{ emoji: '❤️', count: 2, reacted: false }],
    },
    {
      id: 'msg-4',
      author: { id: 'user-4', username: 'Charlie', avatar: null },
      content: 'I just pushed some new changes to the repo. Check out the latest commit for the authentication system.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      reactions: [],
    },
    {
      id: 'msg-5',
      author: { id: 'user-6', username: 'Eve', avatar: null },
      content: 'Nice work Charlie! I\'ll review it today.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      reactions: [{ emoji: '👍', count: 1, reacted: false }],
    },
    {
      id: 'msg-6',
      author: { id: 'user-3', username: 'Bob', avatar: null },
      content: 'Anyone available for a quick call?',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      reactions: [],
    },
  ],
};

export function getServerById(serverId) {
  return servers.find(s => s.id === serverId);
}

export function getChannelsForServer(serverId) {
  return channels[serverId]?.categories || [];
}

export function getMembersForServer(serverId) {
  return members[serverId] || [];
}

export function getMessagesForChannel(channelId) {
  return messages[channelId] || [];
}

export function getChannelById(serverId, channelId) {
  const serverChannels = channels[serverId]?.categories || [];
  for (const category of serverChannels) {
    const channel = category.channels.find(ch => ch.id === channelId);
    if (channel) return channel;
  }
  return null;
}
