import path from 'path';

import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

export default class Routes {

  constructor(express, app, db) {
    this.express = express;
    this.app = app;
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
    // GETs
    this.app.get('/', (req, res, next) => {
      HomeController.getHome(req, res, next, this.db);
    });

    this.app.get('/users', (req, res, next) => {
      UserController.readUsers(req, res, next, this.db);
    })

    this.app.get('/user', (req, res, next) => {
      UserController.readUser(req, res, next, this.db);
    })

    // POSTs
    this.app.post('/user', (req, res, next) => {
      UserController.createUser(req, res, next, this.db);
    })

    this.app.post('/users', (req, res, next) => {
      UserController.createUsers(req, res, next, this.db);
    })
  }
}