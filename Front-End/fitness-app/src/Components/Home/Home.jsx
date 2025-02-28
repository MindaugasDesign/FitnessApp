import { Button } from "../Extra Components/Button/Button";
import "./Home.css";

export function Home() {
  return (
    <>
      <div id="home__Header">
        <h1 className="home__Header__text">All available users</h1>
        <Button buttonText={"Add New User"} />
      </div>

      {/* <div id="allUser__wrapper">
        <div id="webUser">
          <p className="dateCreated">Date created: 2025-02-05</p>
          <div className="userName"> Name: Mindaugas</div>
          <p className="userAge">Age: 27</p>
          <p className="userEmail">Email: test@test.com</p>

          <div className="userDetails">
            <p className="userWeight">Weight: 95kg</p>
            <p className="userHeight">Height: 1.92m</p>
          </div>
          <div className="control__buttons">
            <div className="icon__wrapper">
              <p className="test">
                <span className="edit-container">
                  <i className="fa-solid fa-eye edit-icon"></i>
                  <span className="edit-text">View User</span>
                </span>
              </p>
            </div>
            <div className="icon__wrapper">
              <p className="test">
                <span className="edit-container">
                  <i className="fa-solid fa-pen-to-square edit-icon"></i>
                  <span className="edit-text">Edit User</span>
                </span>
              </p>
            </div>
            <div className="icon__wrapper">
              <p className="test">
                <span className="edit-container">
                  <i className="fa-solid fa-trash edit-icon"></i>
                  <span className="edit-text">Delete User</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <form id="addNewUser">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="userEmail">Email</label>
        <input type="email" name="userEmail" id="userEmail" />
        <label htmlFor="userAge">Enter your age</label>
        <input type="number" name="userAge" id="userAge" />
        <label htmlFor="userWeigth">Enter your body weigth</label>
        <input type="number" name="userWeigth" id="userWeigth" />
        <label htmlFor="userHeight">Enter your height</label>
        <input
          type="number"
          name="userHeight"
          id="userHeight"
          className="inputsels"
        />
        <p className="heightInstructions">Enter in centimeters</p>
        <input type="submit" value="Enter New User" />
      </form>
    </>
  );
}
