import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import UserProfile from "./pages/UserProfile";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { useUserStore } from "./stores/useUserStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("App: ", { user, checkingAuth });

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <div className="relative z-50">
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/user-profile"
            element={user ? <UserProfile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="*"
            element={user ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin"
            element={
              user && user.role === "ADMIN" ? (
                <AdminPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
