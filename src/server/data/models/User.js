export default class User {

  constructor(mongoose) {
    this.mongoose = mongoose;
    this.createModel();
  }

  createModel() {
    var Schema = this.mongoose.Schema;
    this.mongoose.model('User', new Schema({
      name: String,
      uname: String,
      email: String,
      age: Number
    }));
  }
}