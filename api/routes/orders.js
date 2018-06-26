const exppress = require('express');
const mongoose = require('mongoose');

const router = exppress.Router();

const Order = require('../models/orders');

router.post('/', function (req, res, next) {
      let order = new Order({
            _id: new mongoose.Types.ObjectId(),
            productId: req.body.productId,
      });
      order
            .save()
            .then(doc => {
                  res.status(201).json({
                        message: 'order was delivered suces...',
                        createOrder: doc
                  });
            })
            .catch(err => {
                  res.status(500).json(err);
            });
});

router.get('/', function (req, res, next) {
      Order.find()
            .exec()
            .then(doc => {
                  res.status(200)
                        .json({
                              message: " here is a list of orders",
                              allOrders: doc,
                        });

            })
            .catch(err => {
                  res.status(500).json({
                        error: err
                  });
            });
});
module.exports = router;