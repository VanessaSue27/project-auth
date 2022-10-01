# Project Auth 🔐

This project's goal is to build an **API with authentication** in order to implement a registration flow, learn how to authenticate users using tokens and securely store passwords in databases + Create a Frontend with forms to register, sign in and view some restricted content once logged in 🔓

This is a pair-programming project developed by: Axel Hammarbäck and Vanessa Sue Smith.

## How we built it - What we learned

- The Backend is an Express API using mongoose and MongoDB for our database.
We use one main "User" model to store our various users in the database. This model is using different **validated properties** (for example: min and max length, unique and required) to make sure the data stored is appropriate.

- We have 3 main **endpoints**:
  - A POST endpoint to create a new user.
  - A POST endpoint for the existing users to log in.
  - A GET **restricted** endpoint which makes use of an **authentication middleware**, so it's only accessible with a valid access token.

Find the documentation for this API in the <a href="https://github.com/VanessaSue27/project-auth/tree/master/backend#project-auth-api--backend">Backend folder</a>.

- In the **Frontend** we are using a combination of **React Redux and local states** in order to control the login/ sign up flow.
We provide Login and Sign Up forms which will POST to our API. If successful, we get the user's authentication data, which we can use to make further requests.

- We created one **restricted endpoint** 🔒, only accessible after the user has created or logged in to their account successfully. We make use of an **'Authorization' header** in order to achieve this.

## View it live

Frontend: https://project-auth-vane-axel-frontend.netlify.app/

Backend: ~~https://project-auth-vane-axel.herokuapp.com/~~ Unfortunately since the removal of Heroku free dynos, we had to take this API down 💔 (so it's not currently deployed)
