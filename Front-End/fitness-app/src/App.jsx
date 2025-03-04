import "./App.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Logs } from "./Components/Logs/Logs";
import { Goals } from "./Components/Goals/Goals";
import { AddUser } from "./Components/InputForms/AddUser/AddUser";
import { Return } from "./Components/Extra Components/Return/Return";
import { Footer } from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/goals" element={<Goals />} />
        <Route
          path="/newuser"
          element={
            <>
              <Return />
              <div className="newUserContainer">
                <AddUser />
              </div>
            </>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
