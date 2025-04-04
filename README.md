# HireTrack Backend

Backend database and API for Capstone project

## Installation instructions

- Clone this repo and open it in your terminal
- Run `npm install` to install the project
- Create a .env file in the project directory (see the included .env.sample file for an example)
- Make sure MySQL is installed on your computer before running the following step
- Run `npx knex migrate:latest` and `npx knex seed:run` to create and populate the project database on your computer
- Run `npm start` to start the backend API server
