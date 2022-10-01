## Project Auth API 👩‍💻 BACKEND

## DOCUMENTATION:

### Base URL: ~~https://project-auth-vane-axel.herokuapp.com/~~ Unfortunately since the removal of Heroku Free dynos we had to take this API down 💔 so it's not deployed at the moment.

#### POST /users
Registration endpoint: create a new user (sign up)
This endpoint expects a name and password in the client's POST request body in order to create a new User in the database.

#### POST /sessions
Login endpoint: login for already existing users
This endpoint expects a username and password in the client's POST request in order to authenticate an already existing User.

#### GET /users/:id/secret
Restricted endpoint: only available after a user has successfully signed up or logged in to their account
The user's ID must be included in the GET request URL.
In order for it to be validated, this endpoint expects the user's valid access token included in the GET request's Authorization header.
