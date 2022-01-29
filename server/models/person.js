const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    sex: String,
    age: String,
    jobId: String
})

module.exports = mongoose.model("Person", personSchema)