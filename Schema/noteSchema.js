const mongoose = require("mongoose")

const noteSChema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
})

const Note = mongoose.model("note", noteSChema)

module.exports = {Note}