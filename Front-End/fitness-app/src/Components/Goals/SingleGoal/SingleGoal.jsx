export function SingleGoal({ data, userLogs }) {
  const newStartDate = new Date(data.startDate).toISOString().split("T")[0];
  const newEndDate = new Date(data.endDate).toISOString().split("T")[0];
  const newStartDates = new Date(data.startDate);
  const newEndDates = new Date(data.endDate);

  const goalLogs = userLogs
    .map((user) => user.logs)
    .flat()
    .filter((log) => log.selectedGoalId === data.goalId);

  let goalLength = newEndDates.getTime() - newStartDates.getTime();

  let goalLengthInDays = Math.round(goalLength / (1000 * 60 * 60 * 24));
  const goalPercent = Math.round((100 * goalLogs.length) / goalLengthInDays);

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
        value={goalLogs.length}
        max={goalLengthInDays}
      ></progress>
      <p className="goalPercent"> {goalPercent}%</p>
    </div>
  );
}
