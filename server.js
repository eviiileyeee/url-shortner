const express = require("express");
const { ConnectToMongoDB, connectToMongoDB } = require("./connect")
const router = require("./routes/url")
const staticRoute = require("./routes/staticRoute")
const URL = require('./models/url')
const path = require("path")


const app = express();
const port = 8001;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


connectToMongoDB("mongodb://localhost:27017/short-url")
     .then(() => {
          console.log("mongo connected");
     })
     .catch(() => console.log("error at mongo connect"))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/url", router);
app.use("/",staticRoute);

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
     if (entry) {
     res.redirect(entry.redirectUrl)
     }
});


app.get("/url/test",async(req,res)=>{
     const allUrls = await URL.find({});
     return res.render("home",{
        urls : allUrls,
     } );
})

app.listen(port, () => console.log(`server running at ${port}`));

