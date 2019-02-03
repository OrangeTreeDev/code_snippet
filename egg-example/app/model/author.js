module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const Author = new Schema({
    name: {
      type: String
    }
  });

  return mongoose.model('author', Author);
}
