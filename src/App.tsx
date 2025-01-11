import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/share/ProtectedRoute";
import Navbar from "./components/share/Navbar";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/share/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import { AppContext, AppProvider } from "./contexts/AppContext";
import AIChat from "./components/share/AIChat";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_CLIENT_ID}>
          <AppProvider>
            <AppContext.Consumer>
              {({ isOpenAIChat }) => (
                <div className="flex">
                  <div
                    className={
                      isOpenAIChat
                        ? "h-screen w-[calc(100%-400px)]"
                        : "h-screen w-full"
                    }
                  >
                    <Navbar />
                    <div className="pt-16 min-h-[calc(100vh-104px)]">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/movie/:id" element={<Detail />} />
                        <Route path="/search" element={<Search />} />
                        <Route
                          path="/profile"
                          element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </div>
                    <Footer />
                  </div>
                  {isOpenAIChat && (
                    <div className="w-[400px]">
                      <AIChat />
                    </div>
                  )}
                </div>
              )}
            </AppContext.Consumer>
          </AppProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
