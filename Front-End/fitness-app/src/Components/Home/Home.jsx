import { useEffect, useState } from "react";
import { Button } from "../Extra Components/Button/Button";
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
      <div className="home-wrapper">
        <div id="home__Header">
          <h1 className="home__Header__text">All available users</h1>
          <Link to={"/newuser"}>
            <Button buttonText={"Add New User"} />
          </Link>
        </div>

        <div id="allUser__wrapper">
          {userData.map((element) => {
            return (
              <OneUser data={element} key={element._id} userid={element._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}

function OneUser({ data, userid }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...data });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUserData),
    })
      .then((res) => res.json())
      .then(() => {
        setIsEditing(false);
      });
  };

  const handleDelete = (userid) => {
    fetch(`http://localhost:5000/${userid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Deleted user");
      });
  };

  return (
    <div id="webUser">
      <div className="dateCreated">
        <p className="createdText">Date created:</p>
        <p className="createdData">{data.dateCreated}</p>
      </div>

      {isEditing ? (
        <div className="editing-container">
          <label className="edit-label">
            Name:
            <input
              type="text"
              name="name"
              value={editedUserData.name}
              onChange={handleInputChange}
              className="edit-input"
            />
          </label>
          <label className="edit-label">
            Age:
            <input
              type="number"
              name="age"
              value={editedUserData.age}
              onChange={handleInputChange}
              className="edit-input"
            />
          </label>
          <label className="edit-label">
            Email:
            <input
              type="email"
              name="email"
              value={editedUserData.email}
              onChange={handleInputChange}
              className="edit-input"
            />
          </label>
          <label className="edit-label">
            Weight:
            <input
              type="number"
              name="weight"
              value={editedUserData.weight}
              onChange={handleInputChange}
              className="edit-input"
            />
          </label>
          <label className="edit-label">
            Height:
            <input
              type="number"
              name="height"
              value={editedUserData.height}
              onChange={handleInputChange}
              className="edit-input"
            />
          </label>
          <button onClick={handleSave} className="save-Btn">
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="userName">
            <p className="userNameText">Name:</p>
            <p className="userNameData">{data.name}</p>
          </div>
          <div className="userAge">
            <p className="userAgeText">Age:</p>
            <p className="userAgeData">{data.age}</p>
          </div>
          <div className="userEmail">
            <p className="userEmailText">Email:</p>
            <p className="userEmailData">{data.email}</p>
          </div>
          <div className="userHeight">
            <p className="userHeightText">Weight:</p>
            <p className="userHeightData">{data.weight}kg</p>
          </div>
          <div className="userWeight">
            <p className="userWeightText">Height: </p>
            <p className="userWeightData">{data.height / 100}m</p>
          </div>
        </>
      )}

      <div className="control__buttons">
        <Link to={`/logs`} state={{ userId: userid }}>
          <div className="icon__wrapper">
            <p className="test">
              <span className="edit-container">
                <i className="fa-solid fa-eye edit-icon"></i>
                <span className="edit-text">View User</span>
              </span>
            </p>
          </div>
        </Link>

        <div className="icon__wrapper" onClick={() => setIsEditing(!isEditing)}>
          <p className="test">
            <span className="edit-container">
              <i className="fa-solid fa-pen-to-square edit-icon"></i>
              <span className="edit-text">
                {isEditing ? "Cancel" : "Edit User"}
              </span>
            </span>
          </p>
        </div>

        <div className="icon__wrapper" onClick={() => handleDelete(userid)}>
          <p className="test">
            <span className="edit-container deleteBtn">
              <i className="fa-solid fa-trash edit-icon deleteBtn"></i>
              <span className="edit-text">Delete User</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
