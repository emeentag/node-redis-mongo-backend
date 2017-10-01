import BodyParser from 'body-parser';
import MethodOverride from 'method-override';

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
}