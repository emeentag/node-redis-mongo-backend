import Express from 'express';

import CommonMiddleware from './middlewares/CommonMiddleware';
import ErrorHandler from './middlewares/ErrorHandler';
import RedisMiddleware from './middlewares/RedisMiddleware';
import Routes from './routes/Routes';
import ServerConfig from './config/ServerConfig';
import MongooseManager from './data/models/MongooseManager';
import RedisManager from './data/caching/RedisManager';

var app = new Express();

// Common middlewares
const commonMiddleware = new CommonMiddleware(app);

// Error handler middleware
const errorHandler = new ErrorHandler(app);

// Init Mongo DB
const db = new MongooseManager(app);

// Init Redis Caching
const redis = new RedisManager(app);

// Redis cache middleware
const redisCacheMiddleware = new RedisMiddleware(app, redis.client);

// Routes
const routes = new Routes(Express, app, commonMiddleware, redisCacheMiddleware, db.getMongoose());

var server = app.listen(ServerConfig.SERVER_PORT, ServerConfig.SERVER_HOST, () => {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Server ENV is " + process.env.NODE_ENV);
  console.log("Server is listening at http://" + host + ":" + port);
});