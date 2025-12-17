import UserPanel from "./UserPanel";

export default function Channels({
  channels,
  activeChannel,
  setActiveChannel,
}) {
  return (
    <div
      style={{
        width: 240,
        background: "var(--bg-secondary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, padding: "12px 8px" }}>
        <h4
          style={{
            color: "var(--text-muted)",
            marginBottom: 6,
            paddingLeft: 8,
          }}
        >
          TEXT CHANNELS
        </h4>

        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`channel ${
              activeChannel?.id === channel.id ? "active" : ""
            }`}
            onClick={() => setActiveChannel(channel)}
          >
            # {channel.name}
          </div>
        ))}
      </div>

      <UserPanel />
    </div>
  );
}
