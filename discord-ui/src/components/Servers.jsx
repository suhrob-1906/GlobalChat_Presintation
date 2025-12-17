export default function Servers({ servers, activeServer, setActiveServer }) {
  return (
    <div
      style={{
        width: 72,
        background: "#1e1f22",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        gap: 8,
      }}
    >
      {servers.map((server) => (
        <div
          key={server.id}
          className={`server ${
            activeServer?.id === server.id ? "active" : ""
          }`}
          onClick={() => setActiveServer(server)}
          title={server.name}
        >
          {server.name[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
}
