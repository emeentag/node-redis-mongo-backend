export default class Post {

  constructor(mongoose) {
    this.mongoose = mongoose;
    this.createModel();
  }

  createModel() {
    var Schema = this.mongoose.Schema;
    this.mongoose.model('Post', new Schema({
      content: String,
      user: {
        type: Schema.ObjectId,
        ref: 'User'
      }
    }));
  }
}