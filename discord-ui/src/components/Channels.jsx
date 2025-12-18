import UserPanel from "./UserPanel";

export default function Channels({ channels, setActive }) {
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
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          TEXT CHANNELS
        </h4>

        {channels.map((channel) => (
          <div
            key={channel.id}
            className="channel"
            onClick={() => setActive(channel)}
          >
            # {channel.name}
          </div>
        ))}
      </div>

      <UserPanel />
    </div>
  );
}
