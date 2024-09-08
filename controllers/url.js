const URL = require("../models/url")
const  shortid  = require("shortid")

async function handleGenerateNewShortURl(req,res){
           const shortID = shortid();
           const body = req.body;

           if(!body.url) return res.status(400).json({ error : "url is required"})
           await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
           });

           return res.json({ id: shortID})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const url = await URL.findOne({ shortId: shortId });
    return res.json({
        visitHistory: url.visitHistory,
        analytics: url.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURl,
    handleGetAnalytics
};