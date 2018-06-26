const express = require("express"); //загружаем модуль,После получения модуля мы сможем использовать весь определенный в нем функционал
const mongoose = require("mongoose");

const router = express.Router(); //Класс express.Router позволяет определить маршрут, в рамках которого можно создавать подмаршруты, которые связаны со своими обработчиками

const Product = require("../models/products"); //это класс это конструкто р и наоборот

router.get("/", function (req, res, next) {
  Product.find() //вернет псевдо промис
    .exec() // превращает самодельный промис в нормальный
    // .select('-__v, -title' )
    .then(docs => { //С помощью метода then мы можем получить данные, которые возвратил нам сервер и выполнить обработку результата.
      res.status(200) //составляем ответ
        .json({
          message: "Product",
          allProducts: docs
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", function (req, res, next) {
  //некст
  let product = new Product({
    _id: new mongoose.Types.ObjectId(), //запускаем конструктор
    title: req.body.title,
    price: req.body.price
  }); //экземпляр// передаем, наша модель взаимодействует с базой данных
  product
    .save() //что то добавить в базу данных
    //И в конце у объекта вызывается метод save. Этот метод определен для всех создаваемых моделей, он сохраняет текущий объект в базу данных:
    .then(doc => {
      res.status(201).json({
        // что то создано
        message: "Product was created", //сообщение фронту
        createdProduct: doc //создали, отослали продукт
      }); // код  создан
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}); //создали наш новый проудкт

router.patch("/:productId", function (req, res, next) {
  Product.findByIdAndUpdate(req.params.productId, {
      title: req.body.title
    })
    .exec()
    .then(doc => {
      return Product.findById(req.params.productId).exec();
    })
    .then(newDoc => {
      res.status(200).json({
        message: "product is patched now",
        updatedProduct: newDoc
      });
    })
    .catch(err => {
      req.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", function (req, res, next) {
  if (req.auth) {
    Product.findByIdAndRemove(req.params.productId)
      .exec()
      .then(doc => {
        res.status(200).json({
          message: "object was deleted",
          id: doc._id
        });
      })
      .catch(err => {
        req.status(500).json({
          error: err
        });
      });
  } else {
    res.status(401).json({
      message:'You need to login for delete this user'
    })
  }
});

router.put("/:productId", function (req, res, next) {
  Product.findByIdAndUpdate(req.params.productId, {
      title: req.body.title
    })
    .exec()
    .then(doc => {
      return Product.findById(req.params.productId).exec();
    })
    .then(newDoc => {
      res.status(200).json({
        message: "product is patched now",
        updatedProduct: newDoc
      });
    })
    .catch(err => {
      req.status(500).json({
        error: err
      });
    });
});

module.exports = router;
/*Версия документа
По умолчанию при сохранении данных Mongoose добавляет специальное поле __v, которое указывает на версию документа:

var user = new User({name: "Tom", age: 34});
 
user.save(function(err){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log("Сохранен объект user", user);
});
Version в Mongoose и Node.js
Не всегда подобное поле необходимо, и его можно отключить, добавив в схему объект { versionKey: false }:

var userScheme = new Schema(
    {name: String, age: Number}, 
    { versionKey: false }
);*/