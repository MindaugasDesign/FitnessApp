import "./App.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Goals } from "./Components/Goals/Goals";
import { AddUser } from "./Components/InputForms/AddUser/AddUser";
import { Return } from "./Components/Extra Components/Return/Return";
import { Footer } from "./Components/Footer/Footer";
import { AddGoal } from "./Components/InputForms/AddGoal/AddGoal";
import { AddLog } from "./Components/InputForms/AddLog/AddLog";
import { UserDetails } from "./Components/UserDetails/UserDetails";
import { Logs } from "./Components/Log/Logs";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/goals" element={<Goals />} />
        <Route
          path="/newuser"
          element={
            <div className="newUser__wrapper">
              <Return />
              <div className="newUserContainer">
                <AddUser />
              </div>
            </div>
          }
        />
        <Route
          path="addgoal"
          element={
            <div className="addGoal__Container">
              <AddGoal />
            </div>
          }
        />
        <Route
          path="addnewlog"
          element={
            <div className="addLog__Container">
              <AddLog />
            </div>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
