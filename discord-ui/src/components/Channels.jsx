export default function Channels({ channels, setActive }) {
  return (
    <div>
      <h4>Channels</h4>
      {channels.map(c => (
        <div key={c.id} onClick={() => setActive(c)}>
          {c.name}
        </div>
      ))}
    </div>
  );
}
