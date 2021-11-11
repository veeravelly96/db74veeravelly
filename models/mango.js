const mongoose = require("mongoose")
const mangoSchema = mongoose.Schema({
types: String,
taste: String,
cost: Number
})
module.exports = mongoose.model("mango", mangoSchema)