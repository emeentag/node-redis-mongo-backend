import path from 'path';

import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

export default class Routes {

  constructor(express, app, commonMiddleware, redisCacheMiddleware, db) {
    this.express = express;
    this.app = app;
    this.commonMiddleware = commonMiddleware;
    this.redisCacheMiddleware = redisCacheMiddleware;
    this.db = db;
    this.loadTemplateResources()
    this.loadStaticResources()
    this.createURLRoutes();
  }

  // Templates rendering.
  loadTemplateResources() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.resolve(__dirname, '../../', 'client', 'templates'));
  }

  // Static html, img and other files.
  loadStaticResources() {
    this.app.use(this.express.static(path.resolve(__dirname, '../../', 'client', 'statics')));
  }

  createURLRoutes() {
    // ::::GETs::::
    // Home
    this.app.get('/', (req, res, next) => {
      HomeController.getHome(req, res, next, this.db);
    });

    // List users by /users/list?age=32&limit=3&page=0
    this.app.get('/users/list', this.commonMiddleware.queryLimitPageCheck,
      (req, res, next) => {
        this.redisCacheMiddleware.cacheCheck(req, res, next, this.redisCacheMiddleware);
      }, (req, res, next) => {
        UserController.readUsersByPage(req, res, next, this.db, this.redisCacheMiddleware);
    });

    // List all users
    this.app.get('/users', (req, res, next) => {
        UserController.readUsers(req, res, next, this.db);
    });

    // Get single user by /user?email
    this.app.get('/user', this.commonMiddleware.queryContainsEmail, (req, res, next) => {
      UserController.readUserByEmail(req, res, next, this.db);
    });

    // ::::POSTs::::
    // Create single user with body.
    this.app.post('/user', this.commonMiddleware.hasRequestBody, (req, res, next) => {
      UserController.createUser(req, res, next, this.db);
    });

    // Create many user with body.
    this.app.post('/users', this.commonMiddleware.hasRequestBody, (req, res, next) => {
      UserController.createUsers(req, res, next, this.db);
    });

    // ::::PUTs::::
    // Update single user by /user?email with body.
    this.app.put('/user', this.commonMiddleware.queryContainsEmail, this.commonMiddleware.hasRequestBody, (req, res, next) => {
      UserController.updateUserByEmail(req, res, next, this.db);
    });

    // ::::DELETEs::::
    // Delete single user by /user?email
    this.app.delete('/user', this.commonMiddleware.queryContainsEmail, (req, res, next) => {
      UserController.deleteUserByEmail(req, res, next, this.db);
    });

    // Delete all users.
    this.app.delete('/users', (req, res, next) => {
      UserController.deleteUsers(req, res, next, this.db);
    });
  }
}