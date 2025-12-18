export default function Servers({ servers, setActive }) {
  return (
    <div
      style={{
        width: 72,
        background: "var(--bg-tertiary)",
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
          className="server"
          onClick={() => setActive(server)}
          title={server.name}
        >
          {server.name[0].toUpperCase()}
        </div>
      ))}
    </div>
  );
}
