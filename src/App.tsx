import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeListPage from "./pages/RecipeListPage";
import { getCurrentUser, logout, type User } from "./services/authService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  useEffect(() => {
    getCurrentUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipes/:n" element={<RecipeDetailPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
            />
          }
        />
        <Route path="/mypage" element={<MyPage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
