## Assignment 1
### Prerequisites for building and deploying your application locally
 * Run npm install at the root of the repository.
 * As the node modules get installed , run node server.js
 * After that it will indicate that the server is up.
 * You can now use postman to hit the api from outside .
 * URL to hit the api endpoint is: http://localhost:3000/healthz with get request parameter. 
 * If endpoint is visible then 200 response will be returned.
 
### Run Test
   To run the test type npm test in the terminal it should return status of all the test cases.

### GitHub Action 
   When pull request is raised from the feature branch to the organization main branch the github action should run and check branch protection and if all the test cases of the application are passing.Only if both condition are met then allow merging.

### Endpoints:
# GET Particular User
Url:http://localhost:3000/v1/user/self

# POST : Create new user
URL: http://localhost:3000/v1/user
Body:{
    "first_name":"Neha",
    "last_name":"Battula",
    "password":"Neha12",
    "username":"neha@yuy.com"
}
# PUT : Update Existing User
URL:http://localhost:3000/v1/user/self
Body:{
    "username":"Sonali@northeastern.edu",
    "password":"123Fall@2021Changepassword",
    "last_name":"SinghNew2",
    "ff":"dedf"
}
## Basic Authentication used at GET and PUT endpoints

* Programming Language Used: Node Js
* Tool Used : Postman

* Contributor: Sonali Singh
* NEUID: 002105639