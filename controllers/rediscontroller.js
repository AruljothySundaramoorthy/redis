
var { redisclient } = require('../libs/redis');
module.exports = {
    getAllKeys: async (req, res) => {
        const data = await redisclient.sendCommand(["keys", "*"]);

        return res.status(200).send(data)
    },
    saveRedisData: async (req, res) => {
        if (req.body) {
            await redisclient.set(`Userinfo_${req.body.key}`, JSON.stringify(req.body))
            res.send("user data saved with the key " + `Userinfo_${req.body.key}`);
        }
    },
    getRedisDayaByKeys: async (req, res) => {
        const data = await redisclient.get(req.params.key);
        res.send(data)
    }
}