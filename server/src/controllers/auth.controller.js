const User = require("../Db/models/User.model");
const ServiceProvider = require("../Db/models/ServiceProvider.model");
const jwt = require("jsonwebtoken");
const {client} = require("../config/redisConnect")
const auth_user = async (req, res) => {
    try {
        const startTime = Date.now();
        const { phone_number, name, lat, long } = req.body;
        const user = new User({
            phone_number, name, location: {
                long,
                lat
            }
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        user.token = token;
        await user.save();
        await client.set(`${phone_number}`, JSON.stringify(user)).then((reply) => {
            if (!reply) {
                const endTime = Date.now();  
                const timeTaken = endTime - startTime;
                res.status(400).json({
                    response: false,
                    user: user,
                    timeTaken: `${timeTaken}ms`,
                    redis:reply
                });
            } else {
                const endTime = Date.now();
                const timeTaken = endTime - startTime;
                res.status(200).json({
                    response: true,
                    user: user,
                    timeTaken: `${timeTaken}ms`,
                    redis:reply,
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            response: false,
            error: error.message,
        });
    }
};

const auth_serviceProvider = async () => {
     try {
        const startTime = Date.now();
        const { phone_number, name, profession, lat, long, logo, banner } = req.body;
        const user = new ServiceProvider({
            phone_number, name, location: {
                long,
                lat
            },
            profession,
            logo,
            banner
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        user.token = token;
        await client.set(`${phone_number}`, JSON.stringify(user)).then((reply) => {
            if (!reply) {
                const endTime = Date.now();
                const timeTaken = endTime - startTime;
                res.status(400).json({
                    response: false,
                    user: user,
                    timeTaken: `${timeTaken}ms`,
                    redis:reply
                });
            } else {
                const endTime = Date.now();
                const timeTaken = endTime - startTime;
                res.status(200).json({
                    response: true,
                    user: user,
                    timeTaken: `${timeTaken}ms`,
                    redis:reply
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            response: false,
            error: error.message,
        });
    }
}

module.exports = { auth_user, auth_serviceProvider };
