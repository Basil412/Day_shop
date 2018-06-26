const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        productId: {
                type: String,
                require: true
        },
        quantity: {
                type: Number,
                default: 1

        }
}, {
        versionKey: false,//настройки. оптион
});
module.exports = mongoose.model('Order', orderSchema) // создали модель с помощью кторой мы будем взаимодействовать с нашей БД