try {
    var { redisclient } = require("../libs/redis");
    const blocks = require("../mockdata/blocks.json");
    const devices = require("../mockdata/devices.json");
    const operations = require("../mockdata/operations.json");
    const parameters = require("../mockdata/parameters.json");
    const lodash = require('lodash');

    module.exports = {
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
        },
        getAllKeys: async (req, res) => {
            const data = await redisclient.sendCommand(["keys", "*"]);

            return res.status(200).send(data);
        },
        saveRedisData: async (req, res) => {
            if (req.body) {
                await redisclient.set(
                    `Userinfo_${req.body.key}`,
                    JSON.stringify(req.body)
                );
                res.send("user data saved with the key " + `Userinfo_${req.body.key}`);
            }
        },
        getRedisDayaByKeys: async (req, res) => {
            const data = await redisclient.get(req.params.key);
            res.send(JSON.parse(data));
        },
        buildmockdata: async (req, res) => {

            var operationparaemters = [];
            operations.map((x) => {
                x.operationparameters.map((operations) => {
                    const parameter = parameters.find((f) => f.parameterid == operations);
                    operationparaemters.push({
                        parametersname: parameter.parametername,
                        parameterdisplayname: parameter.parameterdisplayname,
                        operationid: x.operationid
                    })
                });
            });

            const devicevalue = devices.map((device) => {
                let tags = {};
                device.deviceoperations.map((operation) => {
                    const operationdata = operationparaemters.find(
                        (f) => f.operationid == operation
                    );
                    tags = {
                        ...tags,
                        [operationdata.parameterdisplayname]: operationdata.parametersname,
                    };
                });
                return {
                    deviceid: device.deviceid,
                    blockid: device.blockid,
                    devicename: device.devicename,
                    devicedisplayname: device.devicedisplayname,
                    parameters: tags,
                };
            });

            const blockdata = lodash.groupBy(devicevalue, "blockid");
            // Clear the redis data
            // await redisclient.flushAll()
            // save blocks
            await redisclient.set("blocks", JSON.stringify(blocks));
            for (let i = 0; i < devicevalue.length; i++) {
                await redisclient.set(`device_${devicevalue[i].deviceid}`, JSON.stringify(devicevalue[i]));
            }
            for (let j = 0; j < Object.values(blockdata).length; j++) {
                await redisclient.set(`block_${Object.keys(blockdata)[j]}`, JSON.stringify(Object.values(blockdata)[j]));
            }
            res.send("device data saved");
        },
    };

} catch (e) {
    console.log(e);

}
