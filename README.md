# Plan for deliverable

- vertical approach
- TDD testing

## Auth Flow

- Signing In:

  0. User submits sign in form
  1. API checks the data base to see if that user exists
  2. If the user exists, the API compares the hashed password from the database with the hashed password sent in the user's request
  3. If user exists and hashed passwords match, API sends success response and attaches a cookie to be stored in the user's browser

  - SUBSEQUENT REQUESTS -

  4. User makes a request to the API, sending the cookie along with it
  5. API gets the request with the cookie, grabs the cookie's value (which is a JSON Web Token) and verifies its contents. If the cookie valid, the API stores the user object on the 'req' object, then continues fulfilling the request

## TDD for sign up

## TDD for sign in

## Ensure you are logged in

## TDD protecting routes using authenticate middleware
