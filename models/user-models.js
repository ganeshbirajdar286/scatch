const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});
const User = mongoose.model("User", userSchema);
module.exports = User;