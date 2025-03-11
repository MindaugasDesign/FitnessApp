import { useEffect, useState } from "react";
import { Button } from "../../Extra Components/Button/Button";
import "./UserGoals.css";
import { Link } from "react-router-dom";
import { SingleGoal } from "../SingleGoal/SingleGoal";

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
        {goals.length > 0 ? (
          goals.map((goal) => (
            <SingleGoal key={goal.goalId} data={goal} userLogs={userLogs} />
          ))
        ) : (
          <p>No goals found.</p>
        )}
      </div>
    </>
  );
}
