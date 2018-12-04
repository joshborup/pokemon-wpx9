# Objectives

## Node

-   Student can create an index.js file
-   Student can run a javascript file using node
-   Student can run a javascript file using nodemon
-   Student can describe that node is the V8 javascript engine
-   Student can require and use other files in node

## Servers

-   Student can describe the role of servers in a client-server model
-   Student can identify the parts of code that listen to external requests

## NPM

-   Student can npm init
-   Student can npm install
-   Student can npm install --save
-   Student can describe the role of a package.json file
-   Student can describe the purpose of the node_modules folder
-   Student can .git ignore node_modules

## Express

-   Student can install and require express
-   Student can start a basic express server by creating an app and listening on a port
-   Student can set up endpoint for `GET`, `PUT`, `POST` and `DELETE`.
-   Student can write the handler function with the correct parameters `req`, `res` and `next`.
-   Student can access url parameters on req.params
-   Student can set up an endpoint path to expect multiple `params`.
-   Student can apply body parser as top level midddle-ware
-   Student can access the body from req.body
-   Student can send data back with res.send and res.json
-   Student can set a status code with res.status

### Top-Level Middleware

-   Student can describe how app.use is fired before every endpoint declared after it.
-   Student can install and set up `body-parser` in an `app.use()` at the top of their server file.

## Tooling - Postman

-   Student can send requests to their server with Postman.
-   Student can send requests to their server with Postman including a body in the request.
-   Student can send requests to their server with Postman including params in the request.

## Express Patterns

-   Student can set up a controller to export content with `module.exports` and require that controller in their server file.
-   Student can write endpoint handler functions in the controller file and then reference them in the endpoint in the server file.
