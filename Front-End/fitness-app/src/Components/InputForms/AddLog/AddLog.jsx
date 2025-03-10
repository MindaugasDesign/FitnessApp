import { useEffect, useState } from "react";
import "./AddLog.css";
import { useLocation } from "react-router-dom";
import { DialogWindow } from "../../Extra Components/DialogWindow/DialogWindow";
import { useNavigate } from "react-router-dom";

export function AddLog() {
  const [userGoalData, setGoalData] = useState([]);
  const location = useLocation();
  const userId = location.state?.userId;
  const [selectedGoal, setGoal] = useState("");
  const [logDate, setLogDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [logDesc, setLogDesc] = useState("");
  const [logName, setLogName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const newLog = {
    userId: userId,
    goal: selectedGoal,
    logName: logName,
    logDesc: logDesc,
    logDate: logDate,
  };

  const handleSubmits = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/addnewlog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog),
    });
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/usergoals/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch goals");
        }
        return res.json();
      })
      .then((data) => {
        setGoalData(data.goals || []);
      })
      .catch((error) => console.error("Error fetching goals:", error));
  }, [userId]);

  return (
    <>
      <div>
        <DialogWindow
          dialogText="User Log Added Successfully"
          isOpen={isOpen}
        />
      </div>
      <div id="newLogForm">
        <form id="addNewLog" onSubmit={handleSubmits}>
          <label htmlFor="userGoal">Select a Goal</label>
          <select
            name="userGoal"
            id="userGoal"
            value={selectedGoal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="_Blank">Please select a goal</option>
            {userGoalData.map((goal) => (
              <option key={goal.goalId} value={goal.goalId}>
                {goal.goalName}
              </option>
            ))}
          </select>
          <label htmlFor="logName">Log Name</label>
          <input
            type="text"
            name="logName"
            id="logName"
            value={logName}
            onChange={(e) => setLogName(e.target.value)}
          />
          <label htmlFor="logDate">Date of the log</label>
          <input
            type="date"
            name="logDate"
            id="logDate"
            value={logDate}
            onChange={(e) => setLogDate(e.target.value)}
          />
          <label htmlFor="logDesc">Details of the log</label>
          <input
            type="text"
            name="logDesc"
            id="logDesc"
            value={logDesc}
            onChange={(e) => setLogDesc(e.target.value)}
          />
          <input type="submit" value="Add a log" />
        </form>
      </div>
    </>
  );
}
