# Interview Scheduler

## Project Description
A React application that allows users to book and cancel interviews. The project takes up W07D1 to W08D3 in the Lighthouse Labs web development bootcamp.

## Final Product

!["show and empty mode"](https://github.com/GraceWXT/scheduler/blob/568543dd7f35d13aa2612cebced43ff82dabdc0d/docs/show-and-empty.png?raw=true)
!["create mode"](https://github.com/GraceWXT/scheduler/blob/568543dd7f35d13aa2612cebced43ff82dabdc0d/docs/create.png?raw=true)
!["edit mode"](https://github.com/GraceWXT/scheduler/blob/568543dd7f35d13aa2612cebced43ff82dabdc0d/docs/edit.png?raw=true)
!["spots remaining updated after save"](https://github.com/GraceWXT/scheduler/blob/568543dd7f35d13aa2612cebced43ff82dabdc0d/docs/spots-remaining.png?raw=true)
!["confirm before delete"](https://github.com/GraceWXT/scheduler/blob/568543dd7f35d13aa2612cebced43ff82dabdc0d/docs/confirm-delete.png?raw=true)

## Technical Specifications

- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server and API server using the `npm start` command.
3. Webpack Dev Server will navigate you to <http://localhost:8000/> in your browser.

## Functional Requirements

- [x] Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- [x] Data is persisted by the API server using a PostgreSQL database.
- [x] The client application communicates with an API WebSocket server over HTTP, using the JSON format.
- [x] Jest tests are used through the development of the project.

## Behavioural Requirements

- [x] Interviews can be booked between Monday and Friday.
- [x] A user can switch between weekdays.
- [x] A user can book an interview in an empty appointment slot.
- [x] Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- [x] A user can cancel an existing interview.
- [x] A user can edit the details of an existing interview.
- [x] The list of days informs the user how many slots are available for each day.
- [x] The expected day updates the number of spots available when an interview is booked or canceled.
- [x] A user is presented with a confirmation when they attempt to cancel an interview.
- [x] A user is shown an error if an interview cannot be saved or deleted.
- [x] A user is shown a status indicator while asynchronous operations are in progress.
- [x] When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- [x] The application makes API requests to load and persist data. We do not lose data after a browser refresh.
- [x] When a user books or cancels an interview, all connected users see the update in their browser.