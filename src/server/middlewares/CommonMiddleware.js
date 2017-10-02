import BodyParser from 'body-parser';
import MethodOverride from 'method-override';
import _ from 'lodash';

export default class CommonMiddleware {

  constructor(app) {
    this.app = app;
    this.applyMiddlewares();
  }

  // Apply common and necessary appwise middlewares.
  applyMiddlewares() {
    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({extended: true}));
    this.app.use(MethodOverride());
  }

  hasRequestBody(req, res, next) {
    if(req.body && !_.isEmpty(req.body)) {
      next();
    } else {
      res.status(400).send("There is no body provided.")
    }
  }

  queryContainsEmail(req, res, next) {
    if(req.query.email) {
      next();
    } else {
      res.status(400).send("There is no email in query.")
    }
  }
}