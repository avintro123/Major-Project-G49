import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="debate/text"
                element={
                  <ProtectedRoute>
                    <DebateInputText />
                  </ProtectedRoute>
                }
              />
              <Route
                path="debate/voice"
                element={
                  <ProtectedRoute>
                    <DebateInputVoice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="evaluation"
                element={
                  <ProtectedRoute>
                    <Evaluation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history/:id"
                element={
                  <ProtectedRoute>
                    <DebateDetail />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
