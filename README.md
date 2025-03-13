# FitnessApp

This application is designed for users to create workout logs, set goals they want to achieve, and track their progress.

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/MindaugasDesign/FitnessApp.git
```

### 2. Navigate to the Correct Directory

Since the frontend and backend are in the same repository, navigate to the appropriate folder:

#### Backend Setup

```sh
cd FitnessApp/Back-End
npm install
npm run start
```

This will start the backend server with a connection to MongoDB.

---

#### Frontend Setup

Open a new terminal (bash if PowerShell was used before):

```sh
cd FitnessApp/Front-End/fitness-app
npm install
npm run dev
```

The frontend server will start, and the terminal will display a local URL. To open the app in a web browser, use `CTRL + Click` on the provided link.

## App Details

**FitnessApp** is an admin panel application designed for managing workout goals and logs.

### Features:

- Track goal progress and add logs to goals.
- Manage users and their workout data.
- View, edit, and delete user information.
- Filter logs by goal for better tracking.

### Home Page

- Displays all registered users.
- Click **"Add New User"** to create a new user and fill in necessary details.
- Each user has three buttons:
  - **View User**: Check logs and goals for a specific user.
  - **Edit User**: Modify user details.
  - **Delete User**: Remove the user along with their logs and goals.

### Logs Section

- Navigate to **Logs** via the navigation bar.
- Select a user from the dropdown to view their logs.
- Each log card contains:
  - **Goal Name**: The goal this log belongs to.
  - **Log Name**: Title of the log entry.
  - **Date Achieved**: When the log entry was recorded.
  - **Description**: Additional details about the log.
- Logs can be filtered by goal to track long-term progress.

### Goals Section

- Similar to the logs section, you can select a user to manage their goals.
- Goals are displayed in individual cards showing:
  - **Goal Name**.
  - **Duration**: Start date to calculated finish date.
  - **Progress**: Percentage completion based on logs added (assuming daily log entries contribute to progress).

This application helps users stay on track with their fitness journey by organizing workout logs and goals efficiently.
