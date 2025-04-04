const mongoose = require("mongoose");
const ownerSchema = mongoose.Schema({
    fullname: {
        type:String,
        minlength:3,
        trim:true,
    },
    email: String,
    password: String,
    gstin:String,
});
const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;