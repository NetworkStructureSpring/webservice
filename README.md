## Assignment 1
1. Prerequisites for building and deploying your application locally
 1.1. Run npm install at the root of the repository.
 1.2. As the node modules get installed , run node server.js
 1.3. After that it will indicate that the server is up.
 1.4. You can now use postman to hit the api from outside .
 1.5. URL to hit the api endpoint is: http://localhost:3000/healthz with get request parameter. 
 1.6. If endpoint is visible then 200 response will be returned.
 
2. Run Test
   To run the test type npm test in the terminal it should return status of all the test cases.

3. GitHub Action 
   When pull request is raised from the feature branch to the organization main branch the github action should run and check branch protection and if all the test cases of the application are passing.Only if both condition are met then allow merging.

Programming Language Used: Node Js
Tool Used : Postman

Contributor: Sonali Singh
NEUID: 002105639