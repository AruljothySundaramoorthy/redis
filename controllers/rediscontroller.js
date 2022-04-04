
var { redisclient } = require('../libs/redis');
module.exports = {
    getAllKeys: async (req, res) => {
        const data = await redisclient.sendCommand(["keys", "*"]);

        return res.status(200).send(data)
    }
}