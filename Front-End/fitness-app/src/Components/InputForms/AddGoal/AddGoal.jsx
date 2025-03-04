import { useState } from "react";
import "./AddGoal.css";

export function AddGoal({ user }) {
  const [goalName, setGoalName] = useState("");
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalDuration, setGoalDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = { userId: user, goalName, goalStartDate, goalDuration };

    try {
      const response = await fetch("http://localhost:5000/addgoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        alert("Goal added successfully!");
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
  };

  return (
    <>
      <h1>User ID: {user}</h1>
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
