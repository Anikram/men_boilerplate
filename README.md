# M.E.N. boilerplate

## Node.js Backend REST API, User Authentication, Password Reset and MongoDB


#To launch
Prerequisites:
- docker installed with demon running

1. clone a repo
2. create .env file and write ENV VARS:


    API_PORT=5000
    NODE_ENV=development
    JWT_SECRET=<secret string>
    DB_SECRET=<secret string>
    DB_CONNECTION_STRING=<string>; default:<mongodb://localhost:27017/meanauth>

3. yarn - to install dependencies
4. yarn keys - to generate key pairs
5. docker-compose up - to build and launch project 

##Core functionality
- Node.js
- Express.js
- Passport.js

##Features
- email & password login
- invoke secure access and refresh tokens
- endpoint can be secured with `passport.authenticate` middleware 
- tokens are signed with rsa key pairs
- tokens invoke on registration and authentication
- despite response, refresh token will be sent over to users with set-cookies header with httpOnly prop

##Available endpoints
Try with Postman or with `req.rest` file in the app's root dir.

base url: ``http://localhost:5000/``

    router.post('/register', authRouter.register);
    router.post('/authenticate', authRouter.authenticate);
    router.post('/refresh_token', authRouter.refreshTokens);
    router.get('/logout', authRouter.logout);
    router.post('/forgot', authRouter.resetPassword);

##Contributors
[Anikram](https://github.com/Anikram])

