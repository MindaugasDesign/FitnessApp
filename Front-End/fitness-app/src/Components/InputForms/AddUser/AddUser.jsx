import { useState } from "react";
import "./AddUser.css";
import { DialogWindow } from "../../Extra Components/DialogWindow/DialogWindow";
import { useNavigate } from "react-router-dom";

export function AddUser() {
  // Adding User Details
  const [nameValue, setNameValue] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const returnLink = "/";

  const navigate = useNavigate();

  //Submit handling

  const handleSubmit = (e) => {
    const date = new Date().toISOString().split("T")[0];

    e.preventDefault();
    const newUser = {
      dateCreated: date,
      name: nameValue,
      lastName: lastName,
      email: userEmail,
      age: userAge,
      weight: userWeight,
      height: userHeight,
    };
    fetch("http://localhost:5000/addnewuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
      navigate(returnLink);
    }, 1500);
  };

  return (
    <div className="addFormContainer">
      <div>
        <DialogWindow
          dialogText="User Added Successfully"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
      <form id="addNewUser" onSubmit={handleSubmit}>
        <label htmlFor="nameValue">Name</label>
        <input
          type="text"
          name="nameValue"
          id="nameValue"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="userEmail">Email</label>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <label htmlFor="userAge">Enter your age</label>
        <input
          type="number"
          name="userAge"
          id="userAge"
          value={userAge}
          onChange={(e) => setUserAge(e.target.value)}
        />
        <label htmlFor="userWeight">Enter your body weigth</label>
        <input
          type="number"
          name="userWeight"
          id="userWeight"
          value={userWeight}
          onChange={(e) => setUserWeight(e.target.value)}
        />
        <label htmlFor="userHeight">Enter your height</label>
        <input
          type="number"
          name="userHeight"
          id="userHeight"
          className="inputsels"
          value={userHeight}
          onChange={(e) => setUserHeight(e.target.value)}
        />
        <p className="heightInstructions">*Enter in centimeters</p>
        <input type="submit" value="Enter New User" />
      </form>
    </div>
  );
}
