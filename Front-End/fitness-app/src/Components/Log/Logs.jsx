import { useEffect, useState } from "react";
import { UserLogs } from "./UserLogs/UserLogs";
import { useLocation } from "react-router-dom";

import "./Logs.css";

export function Logs() {
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
    <div className="log-wrapper">
      {!openedUser ? (
        <div className="first__page">
          <h2>User Logs</h2>

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
        <div className="log__page">
          <h2 className="log__text">Selected User Logs</h2>
          <UserLogs data={openedUser} />
        </div>
      )}
    </div>
  );
}
