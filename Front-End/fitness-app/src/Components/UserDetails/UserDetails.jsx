import { useEffect, useState } from "react";
import "./UserDetails.css";
import { useLocation } from "react-router-dom";
import { SingleLog } from "../Log/SingleLog/SingleLog";
import { SingleGoal } from "../Goals/SingleGoal/SingleGoal";

export function UserDetails() {
  let userData = useLocation();
  const user = userData.state?.userId;
  const [usersData, setUsersData] = useState([]);
  const [userLogs, setUserlogs] = useState([]);
  const [usersLogs, setUserLogs] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userlogs/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setUserlogs(data.logs);
      });
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:5000/usergoals/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setGoals(data.goals);
      });
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:5000/usergoallogs/${user}`)
      .then((res) => res.json())
      .then((data) => {
        const filter = data.map((eachLog) => {
          return eachLog.logs.filter((log) => log.userId === user);
        });
        setUserLogs(filter[0]);
      });
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:5000/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      });
  }, [user]);

  return (
    <div id="userDetails__container">
      <div className="userDetails__userName">
        <h1 className="openUser">
          {usersData.name + " " + usersData.lastName}
        </h1>
      </div>
      <div className="userDetails__userGoals">
        <h2 className="dataName">Goals for {usersData.name}</h2>
        <div className="dataContainer">
          {goals.map((goal) => (
            <SingleGoal key={goal.goalId} data={goal} userLogs={usersLogs} />
          ))}
        </div>
      </div>
      <div className="userDetails__userLogs">
        <h2 className="dataName">Logs for {usersData.name}</h2>
        <div className="dataContainer">
          {userLogs.map((log) => (
            <SingleLog data={log} key={log.logName} />
          ))}
        </div>
      </div>
    </div>
  );
}
