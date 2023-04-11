const mongoose = require("mongoose")

const serviceProviderSchema = mongoose.Schema({
    phone_number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    location: {
        address_formated:String
    },
    services:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Services"
        }
    ],
    profession:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        default:""
    },
    banner:{
        type:String,
        default:""
    },
    bank:{
        account_number:{
            type:String,
            required:true,
            default:""
        },
        ifsc_code:{
            type:String,
            required:true,
            default:""
        }
    },
    revenue:{
        type:Number,
        default:0
    },
    recent_orders:[
     {
        type:mongoose.Types.ObjectId,
        ref:"Orders"   
     }   
    ],
    ratings:{
        type:Number,
        default:0.0
    },
    token:{
        type:String,
        required:true
    },
    proof:{
        type:String,
        // required:true
    }
})

module.exports = serviceProviderSchema