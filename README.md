# FitnessApp

This application is designed for users to create workout logs, set goals they want to achieve and progress that is made

# Installing

# 1. Getting the files fron Github repo :

git clone https://github.com/MindaugasDesign/FitnessApp.git

# 2. Selecting the certainer folder, as frontend and backend are in the same folder:

\*For Backend -

cd FitnessApp/Back-End
npm install
npm run start

\*This should start a server for the backend with connection to MongoDB

///

\*For Frontend -

Open a new terminal (bash if powershell was used before)

cd FitnessApp/Front-End/fitness-app
npm install
npm run dev

\*This will run a frontend server which will be displayed in the console, to open just use CTRL + mouseclick and it will open a web browser on you computer with that link

# App Details

This is an admin panel app for a to-do list like website, where you can track you goal progress and add logs to said goals.

In the home page you can see all of the users that are available. When clicking "Add New User" button, you add a new user and by filling in the details necessary you will be redirected to the home page.
Each user will have 3 buttons: View user, edit user and delete user. Their main purpose is as you can guess, for you to view user, edit user and delete certain user.

View window lets you check selected users Logs and Goals in one page.
Edit will let you edit the information in the user card if it changed.
Delete will delete the user and it's logs and goals

Navigating to Logs in the navigation bar will redirect you to a page where you can select a user you want to see from a dropdown.
Upon selecting you will be met with a page with all of the logs for selected user:

A log card with the information about said log :
.Goal that this log is for
.Name of the log
.Date this log was achieved
.Details of the log (description)

There is a way to filter logs by goal. If you have a goal for a longer period of time, you could check what you've done already and what you could still be doing.

Goal starting page is almost the same as the logs, where you can select a user to check and add Goals for selected user

The Goal page will display goals in cards aswell but in a different manner

It will display:
.Goal name
.Goal duration from start to finish (finish date is calculated based on what was selected when adding a new goal from the start date)
.And the progress of the goal in percentages(this is calculated based on logs added to the goal (assuming each log is added daily))
