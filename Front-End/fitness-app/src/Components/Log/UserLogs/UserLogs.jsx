import "./UserLogs.css";
import { Button } from "../../Extra Components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleLog } from "../SingleLog/SingleLog";

export function UserLogs({ data }) {
  const [userLogs, setUserlogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/userlogs/${data._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserlogs(data.logs);
      });
  }, [data._id]);

  useEffect(() => {
    fetch(`http://localhost:5000/usergoals/${data._id}`)
      .then((res) => res.json())
      .then((data) => {
        setGoals(data.goals);
      });
  }, [data._id]);

  const handleFilterChange = (event) => {
    setSelectedGoal(event.target.value);
  };

  const filteredLogs = selectedGoal
    ? userLogs.filter((log) => log.selectedGoalId === selectedGoal)
    : userLogs;

  return (
    <div className="userLog" id="userLog">
      <div className="log__header">
        <div className="userDetails">
          <h2 className="logOfUser">{data.name + " " + data.lastName}</h2>
        </div>
        <Link to={"/addnewlog"} state={{ userId: data._id }}>
          <Button buttonText={"Add New Log"} />
        </Link>
      </div>
      <div className="filterContainer">
        <p className="filterName">Filter:</p>
        <select
          name="filter"
          id="filter"
          onChange={handleFilterChange}
          value={selectedGoal}
        >
          <option value="">Select a goal</option>
          {goals.map((goal) => (
            <option key={goal.goalId} value={goal.goalId}>
              {goal.goalName}
            </option>
          ))}
        </select>
      </div>
      <div id="log__Container">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <SingleLog data={log} key={log.id || log.logName} />
          ))
        ) : (
          <p>No logs found.</p>
        )}
      </div>
    </div>
  );
}
