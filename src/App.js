import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import InitialSetup from "./pages/InitialSetup";
import Homepage from "./pages/Homepage";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/InitialSetup" element={<InitialSetup />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
