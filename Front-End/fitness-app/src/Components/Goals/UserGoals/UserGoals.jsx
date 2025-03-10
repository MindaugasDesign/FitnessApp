import { useEffect, useState } from "react";
import { Button } from "../../Extra Components/Button/Button";
import "./UserGoals.css";
import { Link } from "react-router-dom";

export function UserGoals({ data }) {
  const [goals, setGoals] = useState([]);
  const [userLogs, setUserLogs] = useState([]);
  const openUser = data?._id;
  useEffect(() => {
    fetch(`http://localhost:5000/usergoals/${openUser}`)
      .then((res) => res.json())
      .then((data) => {
        setGoals(data.goals);
      });
  }, [openUser]);

  useEffect(() => {
    fetch(`http://localhost:5000/usergoallogs/${openUser}`)
      .then((res) => res.json())
      .then((data) => {
        const filter = data.map((eachLog) => {
          return eachLog.logs.filter((log) => log.userId === openUser);
        });
        setUserLogs(filter[0]);
      });
  }, [openUser]);

  return (
    <>
      <div className="usergoal" id="usergoal">
        <div className="goal__header">
          <div className="userDetails">
            <h2 className="goalOfUser">{data.name + " " + data.lastName}</h2>
          </div>
          <Link to={"/addgoal"} state={{ userId: data._id }}>
            <Button buttonText={"Add New Goal"} />
          </Link>
        </div>
      </div>
      <div id="goal__Container">
        {goals.map((goal) => (
          <SingleGoal key={goal.goalId} data={goal} userLogs={userLogs} />
        ))}
      </div>
    </>
  );
}

function SingleGoal({ data, userLogs }) {
  const newStartDate = new Date(data.startDate).toISOString().split("T")[0];
  const newEndDate = new Date(data.endDate).toISOString().split("T")[0];
  const newStartDates = new Date(data.startDate);
  const newEndDates = new Date(data.endDate);

  const goalLogs = userLogs
    .map((user) => user.logs)
    .flat()
    .filter((log) => log.selectedGoalId === data.goalId);

  let goalLength = newEndDates.getTime() - newStartDates.getTime();

  let goalLengthInDays = Math.round(goalLength / (1000 * 60 * 60 * 24));

  return (
    <div id="single__goal">
      <div className="goal">{data.goalName}</div>
      <div className="goal__Dates">
        <div className="fromDate">
          <p className="fromDateTop">Start</p>
          <p className="goalDateCreated">{newStartDate}</p>
        </div>
        <div className="toDate">
          <p className="fromDateTop">End</p>
          <p className="goalDateToFinish">{newEndDate}</p>
        </div>
      </div>
      <progress
        className="goalProgress"
        value={goalLogs.length}
        max={goalLengthInDays}
      ></progress>
    </div>
  );
}
