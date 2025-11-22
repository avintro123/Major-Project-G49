import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DebateInputText from "./pages/DebateInputText";
import DebateInputVoice from "./pages/DebateInputVoice";
import Evaluation from "./pages/Evaluation";
import History from "./pages/History";
import DebateDetail from "./pages/DebateDetail";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="debate/text" element={<DebateInputText />} />
            <Route path="debate/voice" element={<DebateInputVoice />} />
            <Route path="evaluation" element={<Evaluation />} />
            <Route path="history" element={<History />} />
            <Route path="history/:id" element={<DebateDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
