const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToppingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})

const PizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    toppings: {
        type: Array,
        required: true,
        lowercase: true
    },
    checkString : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})

const Topping = mongoose.model("Topping", ToppingSchema);
const Pizza = mongoose.model("Pizza", PizzaSchema);

module.exports = {Topping, Pizza};