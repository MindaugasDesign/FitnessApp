import { AddGoal } from "../InputForms/AddGoal/AddGoal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserGoals } from "./UserGoals/UserGoals";
import "./Goals.css";

export function Goals() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setUserId] = useState("");
  const [openedUser, setOpenedUser] = useState(null);
  let userData = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);

  const addUserId = (e) => {
    setUserId(e.target.value);
  };

  useEffect(() => {
    if (!selectedUserId && userData.state?.userId) {
      setUserId(userData.state.userId);
      return;
    }

    if (!selectedUserId) return;
    fetch(`http://localhost:5000/userlog/${selectedUserId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user log");
        return res.json();
      })
      .then((data) => {
        setOpenedUser(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Fetch error:", err);
      });
  }, [selectedUserId, userData.state?.userId]);

  const handleUserSelect = (e) => {
    e.preventDefault();
    if (!selectedUserId || selectedUserId === "_Blank") {
      alert("Please select a user");
      return;
    }

    fetch(`http://localhost:5000/userlog/${selectedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setOpenedUser(data);
      });
  };

  return (
    <div className="goal-wrapper">
      {!openedUser ? (
        <div className="first__page">
          <h2>User Goals</h2>
          <form id="selectUser" onSubmit={handleUserSelect}>
            <select name="selectUser" id="selectUser" onChange={addUserId}>
              <option value="_Blank">Select User</option>
              {allUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      ) : (
        <div className="goal__page">
          <h2 className="goal__text">Selected User Goals</h2>
          <UserGoals data={openedUser} />
        </div>
      )}
    </div>
  );
}
