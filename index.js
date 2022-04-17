const express = require("express");
const app = express();
const port = 2552;
var bodyParser = require("body-parser");

const chalk = require("chalk");

const rt = require("file-stream-rotator")

var morgan = require("morgan");



var { redisclient } = require("./libs/redis");
const redisroute = require("./routes/redisroute");
const expressSwagger = require("express-swagger-generator")(app);

var cors = require("cors");
// app.use(morgan("combined"));

//Create a new named format
morgan.token("timed", "A new :method request for :url was received. " +
    "It took :total-time[2] milliseconds to be resolved")

let writer = rt.getStream({ filename: "./logs/test.log", frequency: "daily", verbose: true });


//use the new format by name
app.use(morgan('combined', { stream: writer }))

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let options = {
    swaggerDefinition: {
        info: {
            description: "Nodejs Redis API",
            title: "NODE REDIS",
            version: "1.0.0",
        },
        host: "localhost:2552",
        // basePath: '/v1',
        produces: ["application/json", "application/xml"],
        schemes: ["http", "https"],
        // securityDefinitions: {
        //     JWT: {
        //         type: 'apiKey',
        //         in: 'header',
        //         name: 'Authorization',
        //         description: "",
        //     }
        // }
    },
    basedir: __dirname, //app absolute path
    files: ["./routes/**/*.js"], //Path to the API handle folder
};
expressSwagger(options);

// Route Definition
app.use("", redisroute);
app.listen(port, () => {
    console.log(`Redis app listening on port ${port}`);
    console.log(
        chalk.redBright.bgWhite.bold(
            "use the URL to explore :  http://localhost:2552/api-docs"
        )
    );
});
