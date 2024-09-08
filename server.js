const express = require("express");
const { ConnectToMongoDB, connectToMongoDB } = require("./connect")
const router = require("./routes/url")
const URL = require('./models/url')


const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
     .then(() => {
          console.log("mongo connected");
     })
     .catch(() => console.log("error at mongo connect"))


app.use(express.json())

app.use("/url", router)

app.get('/:shortId', async (req, res) => {
     const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate({
          shortId,
     },
          {
               $push: {
                    visitHistory: {
                         timestamp: Date.now(),
                    },
               },
          },
     );
     res.redirect(entry.redirectUrl)
});

app.listen(port, () => console.log(`server running at ${port}`));

