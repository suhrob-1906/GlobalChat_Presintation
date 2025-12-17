export default function Servers({ servers, setActive }) {
  return (
    <div>
      <h4>Servers</h4>
      {servers.map(s => (
        <div key={s.id} onClick={() => setActive(s)}>
          {s.name}
        </div>
      ))}
    </div>
  );
}
