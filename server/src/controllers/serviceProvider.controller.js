const { client } = require("../config/redisConnect");
const Order = require("../db/models/Order.model");
const ServiceProvider = require("../db/models/ServiceProvider.model");

const getDetails = async (req, res) => {
  const id = req.id;
  try {
    const serviceProvider = await ServiceProvider.findOne({ _id: id }).select('logo banner ratings name')
    if (!serviceProvider) {
      return res.status(404).json({
        success: false,
        error: `No service provider found with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: serviceProvider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getOrders = async (req, res) => {
  const _id = req.id;
  const doc = await Order.find({ provider: _id })
    .populate('service', 'title price')
    .populate('user', 'name location')
  res.send({
    response: true,
    data: doc
  })
}

const updateProfile = async (req, res) => {
  const _id = req.id;
  const {updates} = req.body;

  try {
      await ServiceProvider.findOneAndUpdate({ _id },{
        $set:updates
      });
      res.send({
        response: true
      });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getDetails, getOrders, updateProfile };
