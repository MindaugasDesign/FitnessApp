import { Button } from "../Extra Components/Button/Button";
import "./Home.css";

export function Home() {
  return (
    <>
      <div id="home__Header">
        <h1 className="home__Header__text">All available users</h1>
      </div>

      <div id="allUser__wrapper">
        <div id="webUser">
          <div className="user-container">
            <p className="dateCreated">2025-02-05</p>
            <div className="userName">Mindaugas</div>
            <p className="userAge">27</p>
            <div className="userDetails">
              <p className="userWeight">Weight: 95kg</p>
              <p className="userHeight">Height: 1.92m</p>
            </div>
            <div className="data__container">
              <div className="userLogs">
                <p className="logQuantity">Logs: 5</p>
                <button>View Logs</button>
              </div>
              <div className="userGoals">
                <p className="goalQuantity">Goals: 2</p>
                <button>View Goals</button>
              </div>
            </div>
          </div>
          <div className="control__buttons">
            <Button buttonText="Edit User" />
            <Button buttonText="Delete User" />
          </div>
        </div>
      </div>
    </>
  );
}
