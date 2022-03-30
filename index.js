
import express from "express";
const app = express();
const port = 2552;
import { createClient } from "redis";
import bodyParser from 'body-parser'


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const redisclient = createClient(); +
    redisclient.connect()
redisclient.on("error", (err) => {
    console.log(err);
})

async function saveredisdata(data) {
    try {
        await redisclient.set(Object.keys(data)[0], JSON.stringify(Object.values(data)[0]))
    } catch (e) {
        console.log(e)
    }
}
app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.post("/", async (req, res) => {
    if (req.body) {
        await redisclient.set(`Userinfo_${req.body.username}`, JSON.stringify(req.body))
        res.send("user data saved");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
