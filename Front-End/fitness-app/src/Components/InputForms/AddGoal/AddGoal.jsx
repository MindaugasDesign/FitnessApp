import { useState } from "react";
import "./AddGoal.css";
import { useLocation } from "react-router-dom";
import { DialogWindow } from "../../Extra Components/DialogWindow/DialogWindow";
import { useNavigate } from "react-router-dom";

export function AddGoal() {
  const [goalName, setGoalName] = useState("");
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalDuration, setGoalDuration] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = { userId: userId, goalName, goalStartDate, goalDuration };

    if (goalName === "" || goalStartDate === "" || goalDuration === "") {
      alert("Missing Goal info");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addgoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        setGoalName("");
        setGoalStartDate("");
        setGoalDuration("");
      } else {
        alert("Failed to add goal.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <div>
        <DialogWindow
          dialogText="User Goal Added Successfully"
          isOpen={isOpen}
        />
      </div>
      <form id="addNewGoal" onSubmit={handleSubmit}>
        <label htmlFor="goalName">Goal Name</label>
        <input
          type="text"
          name="goalName"
          id="goalName"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />

        <label htmlFor="goalStartDate">Start Date</label>
        <input
          type="date"
          name="goalStartDate"
          id="goalStartDate"
          value={goalStartDate}
          onChange={(e) => setGoalStartDate(e.target.value)}
        />

        <label htmlFor="goalDuration">Goal Duration</label>
        <select
          name="goalDuration"
          id="goalDuration"
          value={goalDuration}
          onChange={(e) => setGoalDuration(e.target.value)}
        >
          <option value="">Select One</option>
          <option value="1day">1 Day</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
          <option value="1year">1 Year</option>
        </select>

        <input type="submit" value="Add New Goal" />
      </form>
    </>
  );
}
