export default class ErrorHandler {

  constructor(app) {
    this.app = app
    this.applyMiddlewares()
  }

  // Apply appwise middleware.
  applyMiddlewares() {
    this.app.use(this.logErrors)
    this.app.use(this.xhrErrorHandler)
    this.app.use(this.errorPageHandler)
  }

  // Just print the error and jump to next error middleware.
  logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
  }

  // If xhr in progress return 500 else jump to next error middleware.
  xhrErrorHandler(err, req, res, next) {
    if(req.xhr) {
      res.status(500).send({error: err.stack})
    } else {
      next(err)
    }
  }

  // Render the error page with 500 response code.
  errorPageHandler(err, req, res, next) {
    res.status(500)
    res.render('error', {error: err.stack})
  }
}