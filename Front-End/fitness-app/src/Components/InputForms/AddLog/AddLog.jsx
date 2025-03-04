import { useEffect, useState } from "react";
import "./AddLog.css";

export function AddLog() {
  const userId = "67c487a68e6d32317ecc6267";
  const [userGoalData, setGoalData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/usergoals/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setGoalData(data);
      });
  }, []);

  return (
    <div>
      {userGoalData && userGoalData.goals.length > 0
        ? userGoalData.goals[0].goalName
        : "No goals found"}
    </div>
  );
}
