import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import InitialSetup from "./pages/InitialSetup";
import Homepage from "./pages/Homepage";
import Authorization from "./pages/Authorization";
import AuthorizationDropbox from "./pages/AuthorizationDropbox";
import LoginFailed from "./pages/LoginFailed";
import HomepageDropbox from "./pages/HomepageDropbox";

import "./index.css";
import InitialSetupDropbox from "./pages/InitialSetupDropbox";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/InitialSetup" element={<InitialSetup />} />
        <Route path="/InitialSetup" element={<InitialSetupDropbox />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/auth/google/oauth-callback" element={<Authorization />} />
        <Route
          path="/auth/dropbox/oauth-callback"
          element={<AuthorizationDropbox />}
        />
        <Route path="/LoginFailed" element={<LoginFailed />} />
        <Route path="/HomepageDropbox" element={<HomepageDropbox />} />
      </Routes>
    </Router>
  );
}

export default App;
