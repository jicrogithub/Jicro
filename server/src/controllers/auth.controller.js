const User = require("../Db/models/User.model");
const axios = require('axios');
const ServiceProvider = require("../Db/models/ServiceProvider.model");
const jwt = require("jsonwebtoken");
const { client } = require("../config/redisConnect")
const auth_user = async (req, res) => {
    try {
        const startTime = Date.now();
        const { waId, address } = req.body;
        const config = {
            headers: {
                'clientId': 'lytvflbj',
                'clientSecret': 'eepo0q116dir3603',
                'Content-Type': 'application/json',
            },
        };

        await axios.post('https://jicro.authlink.me', {
            waId
        }, config)
            .then(async (e) => {
                const user = new User({
                    phone_number: e.data.data.userMobile, name: e.data.data.userName, location: {
                        address_formated: address
                    }
                });
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
                user.token = token;
                await user.save();
                await client.set(`${e.data.data.userMobile}`, JSON.stringify(user)).then((reply) => {
                    if (!reply) {
                        const endTime = Date.now();
                        const timeTaken = endTime - startTime;
                        res.status(400).json({
                            response: false,
                            user: user,
                            timeTaken: `${timeTaken}ms`,
                            redis: reply
                        });
                    } else {
                        const endTime = Date.now();
                        const timeTaken = endTime - startTime;
                        res.status(200).json({
                            response: true,
                            user: user,
                            timeTaken: `${timeTaken}ms`,
                            redis: reply,
                        });
                    }
                });
            })
            .catch((error) => {
                res.status(400).json({
                    response: false,
                    error: error.message,
                });
            });
    } catch (error) {
        res.status(400).json({
            response: false,
            error: error.message,
        });
    }
};

const auth_serviceProvider = async (req, res) => {
    try {
        const startTime = Date.now();
        const { waId, name, profession, address, logo, banner, proof } = req.body;
        const config = {
            headers: {
                'clientId': 'lytvflbj',
                'clientSecret': 'eepo0q116dir3603',
                'Content-Type': 'application/json',
            },
        };

        await axios.post('https://jicro.authlink.me', {
            waId
        }, config).then(async (e) => {
            const SP = await ServiceProvider.findOne({ phone_number: e.data.data.userMobile });
            if (SP) {
                const endTime = Date.now();
                const timeTaken = endTime - startTime;
                res.status(200).json({
                    response: true,
                    user: SP,
                    timeTaken: `${timeTaken}ms`,
                });
            } else {
                const serviceProvider = new ServiceProvider({
                    phone_number: e.data.data.userMobile, name, location: {
                        address
                    },
                    profession,
                    logo,
                    banner,
                    proof
                });
                const token = jwt.sign({ id: serviceProvider._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
                serviceProvider.token = token;
                await serviceProvider.save()
                await client.set(`${e.data.data.userMobile}`, JSON.stringify(serviceProvider)).then((reply) => {
                    console.log(reply)
                    if (!reply) {
                        const endTime = Date.now();
                        const timeTaken = endTime - startTime;
                        res.status(400).json({
                            response: false,
                            user: serviceProvider,
                            timeTaken: `${timeTaken}ms`,
                            redis: reply
                        });
                    } else {
                        const endTime = Date.now();
                        const timeTaken = endTime - startTime;
                        res.status(200).json({
                            response: true,
                            user: serviceProvider,
                            timeTaken: `${timeTaken}ms`,
                            redis: reply
                        });
                    }
                });
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            response: false,
            error: error.message,
        });
    }
}

module.exports = { auth_user, auth_serviceProvider };
