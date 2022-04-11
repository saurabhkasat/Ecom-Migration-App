# Ecom-Migration-App

Technolgies used to in this project  -
Frontend - React
Service - NodeJS
Database - Postgresql

Run below commands to create docker image and attach them to container -
1. open Terminal and navigate to app root folder
2. docker-compose up -d

once the step 2 completes, open below url in browser - 
http://localhost:3000/

To run unit tests, run below commands - 
1. open Terminal and navigate to service folder
2. install mocha globally "npm install -g mocha"
3. install npm packages mentioned in devDependency section in package.json "mocha, chai, chai-http, yarg)
4. npm run test

Total 2 test cases are setup to unit test node APIs.





