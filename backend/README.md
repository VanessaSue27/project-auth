CORE ROUTES

Base URL: https://project-auth-vane-axel.herokuapp.com/

POST /users
Registration endpoint: create a new user, sign up
This endpoint expects a name and password in the body from the POST request from the Frontend

POST /sessions
Login endpoint: login for already existing users
This endpoint expects a username and password from frontend POST request

GET /users/:id/secret
Restricted endpoint: only available after a user has successfully logged in to their account
In order for it to be validated, this endpoint expects the user's valid access token included in the GET request's Authorization header