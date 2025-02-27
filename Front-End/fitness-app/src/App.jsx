import "./App.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Logs } from "./Components/Logs/Logs";
import { Goals } from "./Components/Goals/Goals";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </>
  );
}

export default App;
