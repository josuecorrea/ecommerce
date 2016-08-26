var router = require('express').Router();
var router = require('async');
var faker = require('faker');
var Category = require('../models/category');
var Product = require('../models/product');

router.get('/:name', function(req, res, next){
    async.waterfall([
        function(callback){
            Category.findOne({name: req.body.name}, function (err, category) {
                if(err) return next(err);
                callback(null, category);
              });
        },
        function (callback) {
            for(var i = 0; i < 30; i++){
                var product = new Product();

                product.category = category._id;
                product.name = faker.commerce.productName();
                product.price = faker.commerce.price();
                product.image = faker.commerce.image();

                product.save();
            }
          }
    ])
});