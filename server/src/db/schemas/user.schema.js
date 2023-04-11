const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    phone_number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    location: {
        address_formated:{
            type:String,
            required:true
        }
    },
    orders:[
        {
            services:{
                type:mongoose.Types.ObjectId,
                ref:"Service"
            },
            provider:{
                type:mongoose.Types.ObjectId,
                ref:'ServiceProvider'
            },
            status:{
                type:String,
                required:true
            },
            orderID:{
                type:mongoose.Types.ObjectId
            }
        }
    ],
    refers:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    searches:[],
    token:{
        type:String,
        required:true
    }
})

module.exports = userSchema