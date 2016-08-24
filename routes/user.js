var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

router.get('/login', function(req, res){
    if(req.user) return res.redirect('/');
    res.render('accounts/login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', function(req, res, next){
    res.render('accounts/signup',{
        errors: req.flash('errors')
    });
});

router.get('/profile', function (req, res) {
    res.json(req.user);
});

router.post('/signup', function (req, res, next) {
       var user = new User();

       user.profile.name = req.body.name;
       user.password = req.body.password;
       user.email = req.body.email;

       User.findOne({email: req.body.email}, function (err, existingUser) {

            if(existingUser){
                req.flash('errors', 'Account with that email address already exists');
                return res.redirect('/signup');
            }else{
                user.save(function(err,user){
                    if(err) return next(err);
                    return res.redirect('/');
                });
            }
         });
});

module.exports = router;