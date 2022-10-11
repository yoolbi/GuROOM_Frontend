import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import InitialSetup from "./pages/InitialSetup";
import Homepage from "./pages/Homepage";
import Home from "./pages/Home";
import CompareSnapshots from "./pages/CompareSnapshots";
import AccessControl from "./pages/AccessControl";
import Authorization from "./pages/Authorization";

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/InitialSetup" element={<InitialSetup />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CompareSnapshots" element={<CompareSnapshots />} />
        <Route path="/AccessControl" element={<AccessControl />} />
        <Route path="/auth/oauth-callback" element={<Authorization />} />
      </Routes>
    </Router>
  );
}

export default App;
