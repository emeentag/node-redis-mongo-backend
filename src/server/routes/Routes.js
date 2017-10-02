import path from 'path';

import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

export default class Routes {

  constructor(express, app, db, middlewares) {
    this.express = express;
    this.app = app;
    this.db = db;
    this.middlewares = middlewares;
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

    // List users by /users?age=32&limit=3&page=0
    this.app.get('/users', (req, res, next) => {
      if(req.query.page) {
        UserController.readUsersByPage(req, res, next, this.db);
      } else {
        UserController.readUsers(req, res, next, this.db);
      }
    })

    // Get single user by /user?email
    this.app.get('/user', this.middlewares.queryContainsEmail, (req, res, next) => {
      UserController.readUserByEmail(req, res, next, this.db);
    })

    // ::::POSTs::::
    // Create single user with body.
    this.app.post('/user', this.middlewares.hasRequestBody, (req, res, next) => {
      UserController.createUser(req, res, next, this.db);
    })

    // Create many user with body.
    this.app.post('/users', this.middlewares.hasRequestBody, (req, res, next) => {
      UserController.createUsers(req, res, next, this.db);
    })

    // ::::PUTs::::
    // Update single user by /user?email with body.
    this.app.put('/user', this.middlewares.queryContainsEmail, this.middlewares.hasRequestBody, (req, res, next) => {
      UserController.updateUserByEmail(req, res, next, this.db);
    })

    // ::::DELETEs::::
    // Delete single user by /user?email
    this.app.delete('/user', this.middlewares.queryContainsEmail, (req, res, next) => {
      UserController.deleteUserByEmail(req, res, next, this.db);
    })
    
    // Delete all users.
    this.app.delete('/users', (req, res, next) => {
      UserController.deleteUsers(req, res, next, this.db);
    })
  }
}