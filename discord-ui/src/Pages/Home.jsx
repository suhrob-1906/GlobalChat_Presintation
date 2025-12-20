import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getDialogs } from "../api/dialogs";
import Sidebar from "../components/Sidebar";
import DialogList from "../components/DialogList";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import "../styles/home.css";

export default function Home() {
  const { user } = useAuth();
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [dialogs, setDialogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDialogs();
    const interval = setInterval(loadDialogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadDialogs = async () => {
    try {
      const data = await getDialogs();
      setDialogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="dialogs-panel">
          <DialogList 
            dialogs={dialogs} 
            selectedDialog={selectedDialog}
            onSelectDialog={setSelectedDialog}
          />
        </div>

        <div className="messages-panel">
          {selectedDialog ? (
            <>
              <div className="message-header">
                <h2>{selectedDialog.title || selectedDialog.name}</h2>
              </div>
              <MessageList dialogId={selectedDialog.id} />
              <MessageInput dialogId={selectedDialog.id} onMessageSent={loadDialogs} />
            </>
          ) : (
            <div className="no-dialog-selected">
              <p>Выберите диалог для начала переписки</p>
            </div>
          )}
        </div>

        <div className="users-online-panel">
          <h3>Онлайн</h3>
          <div className="online-users">
            {/* Список пользователей онлайн будет здесь */}
          </div>
        </div>
      </div>
    </div>
  );
}