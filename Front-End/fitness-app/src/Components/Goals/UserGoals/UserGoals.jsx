import { useEffect, useState } from "react";
import { Button } from "../../Extra Components/Button/Button";
import "./UserGoals.css";
import { Link } from "react-router-dom";

export function UserGoals({ data }) {
  // let testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // let testArrs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [goals, setGoals] = useState([]);
  const [userLogs, setUserLogs] = useState([]);

  const openUser = data?._id;

  // useEffect(() => {
  //   if (testArrs.length === testArr.length) {
  //     console.log("haha");
  //   }
  // }, [testArrs.length, testArr.length]); // Runs when either value changes

  useEffect(() => {
    fetch(`http://localhost:5000/usergoals/${openUser}`)
      .then((res) => res.json())
      .then((data) => {
        setGoals(data.goals);
      });
  }, [openUser]);

  useEffect(() => {
    fetch(`http://localhost:5000/userlogs/${openUser}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserLogs(data.logs);
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
        <div id="single__goal">
          <div className="goal">Learn more JavaScript</div>
          <div className="goal__Dates">
            <div className="fromDate">
              <p className="fromDateTop">Start</p>
              <p className="goalDateCreated">2025-03-02</p>
            </div>
            <div className="toDate">
              <p className="fromDateTop">End</p>
              <p className="goalDateToFinish">2025-03-09</p>
            </div>
          </div>
          <progress
            className="goalProgress"
            // value={testArrs.length}
            // max={testArr.length}
          ></progress>
        </div>
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
        // value={userLogs.length}
        max={goalLengthInDays}
      ></progress>
    </div>
  );
}
