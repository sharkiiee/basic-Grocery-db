const mongoose = require("mongoose");

mongoose.connect("URL")

const AdminSchema = new mongoose.Schema({
    username: String,
    password: Number    
})

const UserSchema = new mongoose.Schema({
    username: String,
    password: Number,
    phoneNo : Number
})

const ProductSchema = new mongoose.Schema({
    productName: String,
    price: Number
})

const Admin = mongoose.model('Admin',AdminSchema);
const User = mongoose.model('User',UserSchema);
const Product = mongoose.model('Product',ProductSchema);

module.exports = {
    Admin,
    User,
    Product
}