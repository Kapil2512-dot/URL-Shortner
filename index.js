const express = require("express");
const app = express();
const {connectToMongoDB} = require("./connect");
const PORT = 8001;
const URL = require("./models/url");
app.use(express.json());
const urlRoute = require('./routes/url');
const { connect } = require("mongoose");

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("Mongodb connected"));


app.use('/url', urlRoute);

app.get("/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
        visitHistory:{
            Timestamps: Date.now(),
        },
        },
    
    }
    );
    res.redirect(entry.redirectURL);
});
app.listen(PORT, ()=>console.log(`Server started at ${PORT}`));
