const { client } = require("../config/redisConnect") 
const axios = require("axios");
module.exports = async function check(req, res, next) {
    const startTime = Date.now();
    const {waId} = req?.body
    const config = {
        headers: {
            'clientId': 'lytvflbj',
            'clientSecret': 'eepo0q116dir3603',
            'Content-Type': 'application/json',
        },
    };

    await axios.post('https://jicro.authlink.me', {
        waId
    }, config).then(async (e)=>{
        // console.log(e.data.data)
        const user = await client.get(`${e.data.data.userMobile}`)
        if (user !== null && waId !== "") {
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
    }).catch((error)=>{
        res.status(400).json({
            response: false,
            error: error.message,
        });
    })
}