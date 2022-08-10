import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/admin-panel" element={<AdminPanel></AdminPanel>}></Route>
      </Routes>
    </div>
  );
}

export default App;
