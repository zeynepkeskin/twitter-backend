const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const authenticateUser = require("./middlewares/auth");
const userController = require("./controllers/userController");
const tweetController = require("./controllers/tweetController");

const port = 3005;

express()
  .use(errorHandler)
  .use(cors())
  .use(express.json())
  .use(
    "/api/users",
    express
      .Router()
      .get("/", authenticateUser, userController.getUsers)
      .post("/", userController.register)
      .post("/login", userController.login)
      .get("/profile", authenticateUser, userController.getProfile)
  )
  .use(
    "/api/tweets",
    express
      .Router()
      .get("/", tweetController.getTweetsForAnonymous)
      .post("/", authenticateUser, tweetController.createTweet)
  )
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
