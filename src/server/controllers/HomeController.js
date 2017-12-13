export default class HomeController {

  static getHome(req, res, next, db) {
    return res.status(200).send("Welcome to My Backend!");
  }
}