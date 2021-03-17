# M.E.N. boilerplate

## Node.js Backend REST API, User Authentication, JWT, Password Reset and MongoDB

## To launch
Prerequisites:
- docker installed with demon running

1. clone a repo
2. create .env file and write ENV VARS:


    API_PORT=5000
    NODE_ENV=development
    JWT_SECRET=<secret string>
    DB_SECRET=<secret string>
    DB_CONNECTION_STRING=<string>; default:<mongodb://localhost:27017/meanauth>
    EMAIL_RESET_SENDER=<email>   

3. yarn - to install dependencies
4. yarn keys - to generate key pairs
5. docker-compose up - to build and launch project 

## Core functionality
- Node.js
- Express.js
- Passport.js
- MongoDB

## Features
- email & password, registration & login
- invoke secure access and refresh tokens
- endpoint can be secured with `passport.authenticate` middleware 
- tokens are signed with rsa key pairs
- tokens invoke on registration and authentication
- despite response, refresh token will be sent over to users with set-cookies header and httpOnly prop

## Please note
This project lack validations (except required: true for firstName, lastName and email).
So some suggestions to start with:

1. Add validations to db models
2. Add some additional auth strategies for Passport.js
3. Add frontend templates. Serving forms might be handy if try to implement single login for 3rd level subdomains.

## Available endpoints
Try with Postman or with `req.rest` file in the app's root dir.

base url: ``http://localhost:5000/``

    router.post('/register', authRouter.register);
    router.post('/authenticate', authRouter.authenticate);
    router.post('/refresh_token', authRouter.refreshTokens);
    router.get('/logout', authRouter.logout);
    router.post('/forgot', authRouter.getResetPasswordLink);
    router.post('/reset', authRouter.resetPassword);

    // secure routes
    router.get('/users', passport.authenticate('jwt'), usersRouter.listUsers);

## Contributors
[Anikram](https://github.com/Anikram])

