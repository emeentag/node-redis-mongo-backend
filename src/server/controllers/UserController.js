export default class UserController {

  // Create single user.
  static createUser(req, res, next, db) {

    db.models.User.create(req.body, (err, user) => {
      if(err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(200).send("User is saved successfully.");
      }
    });
  }

  // Save many user.
  static createUsers(req, res, next, db) {

    db.models.User.create(req.body, (err) => {
      if(err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(200).send("Users are saved successfully.");
      }
    })
  }

  // List single user
  static readUser(req, res, next, db) {
    
    db.models.User.findOne({
      email: req.query.email
    }, (err, user) => {
      if(err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(200).send(user);
      }
    })
  }

  // List all users
  static readUsers(req, res, next, db) {
    db.models.User.find((err, users) => {
      res.send(users);
    })
  }

  // Update user.
  static updateUser(req, res, next, db) {

  }

  // Delete user
  static deleteUser(req, res, next, db) {

  }
}