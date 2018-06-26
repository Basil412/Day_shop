const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({ // установка схемы
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}); // описываем созданный нами новый продукт, схема по которой наш продукт создать
module.exports = mongoose.model('Product', productSchema); //выплюнет объект нашего продукта

/*Так как при обращении к базе данных мы работаем с объектами promise, то необходимо вначале установить их реализацию для свойства Promise:

mongoose.Promise = global.Promise;
Данные, которые используются в Mongoose, описываются определенной схемой. Например, в прошлых темах мы сохраняли в базу данных объекты с двумя свойствами name и age. Поэтому описываем здесь следующую схему:

var Schema = mongoose.Schema;
 
// установка схемы
var userScheme = new Schema({
    name: String,
    age: Number
});
Схема содержит метаданные объектов. В частности, здесь устанавливаем, какие свойства будет иметь объект и какой у них будет тип данных. То есть это схема, которая описывает объект пользователя.

Затем, используя эту схему, создаем модель пользователя:

var User = mongoose.model("User", userScheme);
Первый параметр в методе mongoose.model указывает на название модели, а второй параметр - собственно схема.*/