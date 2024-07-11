const mongoose = require("mongoose");

mongoose.connect("URL");

const AdminSchema = mongoose.Schema({
    username : String,
    shops : [{
        owned:{type: Boolean}
    }]
})

const ownerSchema = mongoose.Schema({
    ownerName : String,
    productDetail : String,
    productList: [{type: Object}],
    shopNo: Number
})

const Admins = mongoose.model('grocery-market',AdminSchema);
const Owners = mongoose.model('grocery-market',ownerSchema);

module.exports = {
    Admins,
    Owners
}