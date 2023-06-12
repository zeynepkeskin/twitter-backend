const Tweet = require('../models/Tweet');

module.exports = {

  createTweet: async (req, res, next) => {
    try {
      // Create the tweet
      const tweetId = await Tweet.create({...req.body, username:req.user.username});
  
      res.status(201).json({ message: 'Tweet created successfully', tweetId });
    } 
    catch (error) {
      next(error)
    }
  },

  getTweetsForAnonymous: async (req, res, next) => {
    try {
      const tweets = await Tweet.getTweetsForAnonymous();
  
      res.json(tweets);
    } 
    catch (error) {
      next(error)
    }
  }
};
