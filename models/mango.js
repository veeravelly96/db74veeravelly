const mongoose = require("mongoose")
const mangoSchema = mongoose.Schema({
types: String,
taste: String,
cost: {
    type: Number,
    minlength: 0,
    maxlength: 3,
},
})
module.exports = mongoose.model("mango", mangoSchema)