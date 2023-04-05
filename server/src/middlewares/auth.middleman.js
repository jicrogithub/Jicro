const { client } = require("../config/redisConnect") 
module.exports = async function check(req, res, next) {
    const startTime = Date.now();
    const { phone_number } = req.body;
    const user = await client.get(`${phone_number}`)
    if (user !== null) {
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        res.status(200).json({
            response: true,
            user: JSON.parse(user),
            timeTaken: `${timeTaken}ms`,
        });
    } else {
        next()
    }
}