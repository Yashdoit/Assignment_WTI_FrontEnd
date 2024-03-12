import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./Admin/Clients";
import DisplayAllClients from "./Admin/DisplayAllClients";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Clients />} path="/clients" />
          <Route element={<DisplayAllClients />} path="/displayallclients" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
