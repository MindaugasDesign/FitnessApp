import { useEffect, useState } from "react";

export function SingleLog({ data }) {
  const [goalName, setGoalName] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/usergoalforlog/${data.selectedGoalId}`)
      .then((res) => res.json())
      .then((data) => {
        setGoalName(data.goals);
      });
  }, [data.selectedGoalId]);

  const logGoalName = goalName.find(
    (goal) => goal.goalId === data.selectedGoalId
  );

  return (
    <div id="single__log">
      <h3 className="goalName">
        {logGoalName ? logGoalName.goalName : "Goal not found"}
      </h3>
      <div className="logName">{data.logName}</div>
      <p className="logDate">{data.logDate}</p>
      <p className="logDesc">{data.logDesc}</p>
    </div>
  );
}
