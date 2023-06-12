const express = require('express');
const app = express();

app.get('/api/tweets', (req, res) => {
    var tweets = [{
        id: 1,
        avatar: "/img/obama.jpg",
        displayName: "Barak Obama",
        username: "@obama",
        date: "1hr",
        text: "Make America Great Again",
        img: "/img/flag.jpg",
        replies: 20,
        retweets: 30,
        likes: 10,
        shares: 4
    },
    {
        id: 2,
        avatar: "/img/flag.jpg",
        displayName: "USA",
        username: "@UnitedStates",
        date: "2hr",
        text: "Make me great again",
        img: "/img/obama.jpg",
        replies: 240,
        retweets: 350,
        likes: 180,
        shares: 40
    }];

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(tweets));
});
  

const port = 3005; // Choose a port number
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
