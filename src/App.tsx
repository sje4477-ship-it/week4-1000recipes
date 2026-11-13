import "./App.css";
import { Route, Routes } from "react-router-dom";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeListPage from "./pages/RecipeListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeListPage />} />
      <Route path="/recipes/:n" element={<RecipeDetailPage />} />
    </Routes>
  );
}

export default App;
