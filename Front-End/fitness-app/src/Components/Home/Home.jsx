import { useEffect, useState } from "react";
import { Button } from "../Extra Components/Button/Button";
import { AddUser } from "../InputForms/AddUser/AddUser";
import { Link } from "react-router-dom";
import "./Home.css";

export function Home() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  return (
    <>
      <div id="home__Header">
        <h1 className="home__Header__text">All available users</h1>
        <Link to={"/newuser"}>
          <Button buttonText={"Add New User"} />
        </Link>
      </div>

      <div id="allUser__wrapper">
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
        {userData.map((element) => {
          return <OneUser data={element} key={element._id} />;
        })}
      </div>
    </>
  );
}

function OneUser({ data }) {
  return (
    <div id="webUser">
      <p className="dateCreated">Date created: {data.dateCreated}</p>
      <div className="userName"> Name: {data.name}</div>
      <p className="userAge">Age: {data.age}</p>
      <p className="userEmail">Email: {data.email}</p>

      <div className="userDetails">
        <p className="userWeight">Weight: {data.weight}kg</p>
        <p className="userHeight">Height: {data.height / 100}m</p>
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
  );
}
