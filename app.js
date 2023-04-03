const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
// express app
const app = express();
const dbURI =
  "mongodb+srv://apaekshit:aFq2zBFNhnFXxQk8@nodejspractice.mupp28y.mongodb.net/NodejsDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// listen for requests
// app.listen(3000); added afer connection to the DB

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Logger Middleware");
  console.log("host", req.hostname);
  console.log("path", req.path);
  console.log("method", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});

//mongoose and mongo sandbox
app.get("/create-blog", (req, res) => {
  const blog = new Blog({
    title: "Apaekshit rawat",
    snippet: "This is the someting vomething",
    body: "this is the body of the victim",
  });
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6426bc0d43752a48d68f90d3")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// Route to Home page to show all blogs
app.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "ALL Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

// home page route without having data from the database
// app.get("/", (req, res) => {
//   const blogs = [
//     {
//       title: "Yoshi finds eggs",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "Mario finds stars",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "How to defeat bowser",
//       snippet: "Lorem ipsum dolor sit amet consectetur",
//     },
//     {
//       title: "How to get a job in 2023",
//       snippet: "I dont know :)",
//     },
//   ];
//   res.render("index", { title: "Home", blogs });
// });

// about page route
app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

// redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// Create blog route
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Forms" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("./");
    })
    .catch((err) => console.log(err));
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
