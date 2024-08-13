import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Info from "./pages/Info";
import Create from "./pages/Create";
import CreateLaunchpad from "./pages/CreateLaunchpad";

import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div id="app">
      <Router>
        <div className="navbar">
          <NavigationBar />
        </div>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/create" element={<Create />} />
            <Route path="/createlaunchpad" element={<CreateLaunchpad />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
