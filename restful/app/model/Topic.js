const { Schema, model } = require("mongoose");

// define the structure of the Topics Collection
const topicSchema = new Schema({
  _id: Schema.ObjectId,
  title: String,
  type: 'it',
  createTime: Date,
  authorsId: Schema.ObjectId
});

// automatically look for the pural version of your model name
const Topic = model('Topic', topicSchema);

// export the Topics Model Class
module.exports = Topic;