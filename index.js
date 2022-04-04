
const express = require("express");
const app = express();
const port = 2552;
var bodyParser = require('body-parser')

var { redisclient } = require('./libs/redis');
const redisroute = require('./routes/redisroute');


const expressSwagger = require('express-swagger-generator')(app);


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let options = {
    swaggerDefinition: {
        info: {
            description: 'Nodejs Redis API',
            title: 'NODE REDIS',
            version: '1.0.0',
        },
        host: 'localhost:2552',
        // basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
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
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

// Route Definition
app.use('', redisroute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
