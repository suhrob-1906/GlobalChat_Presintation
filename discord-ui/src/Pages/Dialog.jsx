import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export default function Dialog() {
  const { id } = useParams();

  return (
    <div className="dialog">
      <MessageList dialogId={id} />
      <MessageInput dialogId={id} />
    </div>
  );
}