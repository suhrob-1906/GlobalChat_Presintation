import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Panel from "./components/Panel";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return (<><Register /><Login /></>);
  return <Panel />;
}
