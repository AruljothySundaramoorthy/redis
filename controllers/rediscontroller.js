
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
    },
    getUsersList: async (req, res) => {
        const data = await redisclient.aclUsers();
        res.send(data)
    },
    getUsersListwithACL: async (req, res) => {
        const data = await redisclient.aclList();
        res.send(data)
    },
    createNewUser: async (req, res) => {
        try {
            const data = await redisclient.ACL_SETUSER(req.params.username, ['+get', '+set']);

            res.send(data)
        } catch (e) {

            return res.status(500).send(e.message)
        }
    }
}