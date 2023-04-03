const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Schema : above created is the schema , which defines the structure to our data , like whats its type and if it is strictly required or not and other structure related things

// Model : model is defined below , it uses the schema and have the functionality to act on the data . To create , delete , update . such functionality are defined in models
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
