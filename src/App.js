import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import InitialSetup_1 from "./pages/InitialSetup_1";
import InitialSetup_2 from "./pages/InitialSetup_2";
import InitialSetup_3 from "./pages/InitialSetup_3";
import InitialSetup_snapshot from "./pages/InitialSetup_snapshot";
import InitialSetup_done from "./pages/InitialSetup_done";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/InitialSetup_1" element={<InitialSetup_1 />} />
        <Route path="/InitialSetup_2" element={<InitialSetup_2 />} />
        <Route path="/InitialSetup_3" element={<InitialSetup_3 />} />
        <Route
          path="/InitialSetup_snapshot"
          element={<InitialSetup_snapshot />}
        />
        <Route path="/InitialSetup_done" element={<InitialSetup_done />} />
      </Routes>
    </Router>
  );
}

export default App;
