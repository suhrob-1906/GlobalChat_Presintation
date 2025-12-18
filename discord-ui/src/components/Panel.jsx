import { useState } from "react";
import Servers from "./Servers";
import Channels from "./Channels";
import Chat from "./Chat";

// Mock data for UI demo
const MOCK_SERVERS = [
  { id: 1, name: "Main Server" },
  { id: 2, name: "Gaming" },
  { id: 3, name: "Dev Team" },
];

const MOCK_CHANNELS = [
  { id: 1, name: "general", topic: "General discussion" },
  { id: 2, name: "random", topic: "Random stuff" },
  { id: 3, name: "announcements", topic: "Important announcements" },
];

const MOCK_MESSAGES = [
  { id: 1, user: "Alice", text: "Hello everyone!", timestamp: new Date().toISOString() },
  { id: 2, user: "Bob", text: "Hey Alice! How are you?", timestamp: new Date().toISOString() },
  { id: 3, user: "Charlie", text: "Welcome to the channel!", timestamp: new Date().toISOString() },
];

export default function Panel() {
  const [servers] = useState(MOCK_SERVERS);
  const [channels] = useState(MOCK_CHANNELS);
  const [server, setServer] = useState(MOCK_SERVERS[0]);
  const [channel, setChannel] = useState(MOCK_CHANNELS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const sendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      user: "DemoUser",
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="app">
      <Servers servers={servers} setActive={setServer} />
      <Channels channels={channels} setActive={setChannel} />
      {channel && <Chat channel={channel} messages={messages} sendMessage={sendMessage} />}
    </div>
  );
}
