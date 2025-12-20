export default function UserCard({ user, onAdd }) {
  return (
    <div>
      <b>{user.username}</b>
      <button onClick={() => onAdd(user.id)}>Add friend</button>
    </div>
  );
}
