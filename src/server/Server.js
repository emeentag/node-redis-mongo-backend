import Express from 'express';
import CommonMiddleware from './middlewares/CommonMiddleware';
import ErrorHandler from './middlewares/ErrorHandler';
import PassportAuthentication from './middlewares/security/PassportAuthentication';
import Routes from './routes/Routes';
import ServerConfig from './config/ServerConfig';
import MongooseDB from './models/MongooseDB';

var app = new Express();

// Common middlewares
const middlewares = new CommonMiddleware(app);

// Error handler middleware
const errorHandler = new ErrorHandler(app);

// Init Mongo DB
const db = new MongooseDB(app);

// Security handler middleware
//const securityHandler = new PassportAuthentication(app)

// Routes
const routes = new Routes(Express, app, db.getMongoose(), middlewares);

var server = app.listen(ServerConfig.SERVER_PORT, ServerConfig.SERVER_HOST, () => {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Server is listening at http://" + host + ":" + port);
});