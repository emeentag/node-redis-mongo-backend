# Backend with Redis and Mongo

This is an API server for users. Because i feel more comfortable with my own code and it has to be shown you how can i design. Anyway, in this project you are able to do all type of CRUD actions on users. I am using mongo nosql database for storing the data. Also I am using redis for caching some endpoints. You can run BDD tests or postman tests.

## Technology used:
* Node.js
* Mongoose.js
* Redis.js
* Babel
* Mocha
* Chai
* ES6
* Docker

## How to setup?

First of all clone or fork this repository. After you successfully clone it then you are ready to setup your environment.

### Setup your environment with using docker:
* Run `npm install` to install all node dependencies.
* Run `docker-compose up` in a terminal. With this command you will have both mongo and redis server in your environment.
* Run `npm run server:development` in another terminal session.
* **You are done.** You can go `http://localhost:3030` and check if everything is up and running.

## How to test?
* Once you run your docker compose, you can also run your server with `npm run server:test` instead development. This script added because in this way you will have a seperate db for testing your app.
* After you start your server you can open another terminal session and run `npm run test`.
* You will seee the results in that terminal session. Don't bother to run your test script again and again. Sample test result is can be seen below:

```
  Backend Testing
    Clear test DB before testing.
      ✓ should delete all records on DB. (50ms)
    Test results for POST requests.
      ✓ should create a single user with given body. (68ms)
      ✓ should create many user with given list.
    Test results for PUT requests.
      ✓ should update the user with given email.
    Test results for GET requests.
      ✓ should return a user name with email. (40ms)
      ✓ should return a list of users.
      ✓ should return limited list of users who are older than age 32.
      ✓ should return all users.
    Test results for DELETE requests.
      ✓ should delete the user with given email.
```

## How is cache working?
As i mentioned before, redis is used for caching. I have a middleware for the paginated endpoint. In this endpoint you need to specify `age`, `limit` and `page` values as query parameters. Then the controller will find the users who are older than this age.

In here if the query results are never cached, i will cache the results as a JSON string in redis for 120 seconds. During that time you will see the logs like saying results are fetched from cache server. Means that, we will never query for this cached query again on mongo.

The cache logic is simple, whenever you made a request, i am creating a key with those query parameters. It is sth like `_` seperated string. Then we are caching the whole result as string on redis. 

When we get a request, our redis cache middleware is always working and if there is cache for this query, we are parsing this string into JSON format and send the result back.

## How could it be better:
First of all there is no missing item in the project. All requested items are done.

But ofcourse there could be some improvements on the system. For instance, for caching we can create another node backend which is only for caching traffic. Right now we are handling caching in a middleware but it could be better if we can create a docker image for only caching backend server. And whenever we get a request for, we can make a request to caching server and can respond in a suitable way. Like microservices. Also we can make this redirection with using a Loadbalancer. Because as we know in pratically, we are caching only for specific endpoints so we can easly redirect those request to that caching server first from LB or another redirection server which is created bby us.

Also an oAuth2 security could be implemented.