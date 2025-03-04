import { AddGoal } from "../InputForms/AddGoal/AddGoal";
import { useEffect, useState } from "react";

export function Goals() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setUserId] = useState("");
  const [openedUser, setOpenedUser] = useState(null);

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
    <div>
      {!openedUser ? (
        <form id="selectUser" onSubmit={handleUserSelect}>
          <select name="selectUser" id="selectUser" onChange={addUserId}>
            <option value="_Blank">Select User</option>
            {allUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <input type="submit" value="Select" />
        </form>
      ) : (
        <div>
          <h2>Selected User Details</h2>
          <pre>{JSON.stringify(openedUser, null, 2)}</pre>
          <AddGoal user={openedUser._id} />
        </div>
      )}
    </div>
  );
}
