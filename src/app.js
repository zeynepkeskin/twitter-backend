const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const authenticateUser = require("./middlewares/auth");
const userController = require("./controllers/userController");
const tweetController = require("./controllers/tweetController");

const app = express();

app.use(errorHandler);

app.use(express.json());

const userRoutes = express.Router();
userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get("/profile", authenticateUser, userController.getProfile);
userRoutes.get("/", authenticateUser, userController.getUsers);
app.use("/api/users", userRoutes);

const tweetRoutes = express.Router();
tweetRoutes.post("/", authenticateUser, tweetController.createTweet);
tweetRoutes.get("/", tweetController.getTweetsForAnonymous);
app.use("/api/tweets", tweetRoutes);

const port = 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
