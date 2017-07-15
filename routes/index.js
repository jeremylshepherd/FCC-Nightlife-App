'use strict';
require('babel-register')({
    presets: ['react']
});

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Venue = require('../models/Venues');
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var ReactApp = require("../views/Components/ReactApp");
var passport = require("passport");
var googleplaces = require("googleplaces");
var zipcodes = require('zipcodes');
var https =  require('https');

require("../config/passport");

/******************************************************************************
******************________AUTHENTICATION ROUTES_________***********************
******************************************************************************/

//Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("You are logged in!");
        return next(); 
    }
    console.error("You must first log in or register first!");
}

/******************
*TWITTER***********
******************/

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
      req.flash('loggedin', "Who's awesome? You're awesome! Thanks for logging in.");
      res.redirect('/');
  }
);

/******************************************************************************
*****************____________Page Routing____________**************************
******************************************************************************/

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('logout', 'You have successfully logged out!');
    res.redirect('/');
});

/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/

router.get('/api/me', isLoggedIn, (req, res) => {
    if(req.user === undefined) {
        res.json({});
    }else{
        res.json(req.user);
    }
});

router.get('/api/zip/:zip', (req, res) => {
    let loc = zipcodes.lookup(req.params.zip);
    res.json(loc);
});

router.get('/api/city/:state/:city', (req, res) => {
    let loc = zipcodes.lookupByName(req.params.city, req.params.state);
    res.json(loc);
});

router.get('/api/bars/:zip', (req, res) => {
    let logged = req.user ? true : false;
    Venue.find({zips: req.params.zip},(err, venues) => {
        if(err) {console.log(err);}
        
        let loc = zipcodes.lookup(req.params.zip);
        let parameters = {};
        parameters.location = [loc.latitude, loc.longitude];
        parameters.types = 'bar';
        parameters.radius = 24140;
        let search = new googleplaces(process.env.GOOGLE_PLACES_API_KEY, process.env.GOOGLE_PLACES_OUTPUT_FORMAT);
        
        search.nearBySearch(parameters, (err, response) => {
            if(err) {console.log(err);}
            let results = response.results;
            let data = results.map((r) => {
                let o = {};
                let going = [];
                let attending = false;
                for(let i = 0; i < venues.length; i++) {
                    if(venues[i].place_id === r.place_id) {
                        going = venues[i].going;
                    }
                    if(logged){
                        if(going.indexOf(req.user._id) !== -1) {
                            attending = true;
                        }
                    }
                }
                o.id = r.id;
                o.place_id = r.place_id;
                o.price = r.price_level;
                o.rating = r.rating;
                o.photo = r.photos[0];
                o.name = r.name;
                o.address = r.vicinity;
                o.going = going;
                o.attending = attending;
                o.auth = req.isAuthenticated();
                return o;
            });
            res.json(data);
        });
    });
});

router.post('/api/user/going', isLoggedIn, (req, res) => {
    User.findOne({'_id': req.user._id}, (err, user) => {
        if(err){res.json(err);}
        
        Venue.findOne({'place_id': req.body.venue}, (err, venue) => {
            if(err){res.json(err);}
            if(venue) {
                venue.going.addToSet(user);
                venue.zips.addToSet(req.body.zip);
                venue.save();
                res.json({'message' : 'User added to venue', 'going' : true});
            }else{
                let newVenue = new Venue();
                newVenue.going.addToSet(user);
                newVenue.place_id = req.body.venue;
                newVenue.zips.addToSet(req.body.zip);
                newVenue.save();
                res.json({'message' : 'New Venue added', 'going' : true});
            }
        });
    });
});

router.post('/api/user/leave', isLoggedIn, (req, res) => {
    User.findOne({'_id': req.user._id}, (err, user) => {
        if(err){res.json(err);}
        Venue.findOne({'place_id': req.body.venue}, (err, venue) => {
            if(err){res.json(err);}
            if(venue) {
                venue.going.remove(user);
                venue.save();
                res.json({'message' : 'User removed from venue'});
            }else{
                res.json({'message' : 'Venue does not exist.'});
            }
        });
    });
});

router.get('*', (req, res) => {
    var reactString = ReactDOMServer.renderToString(
        React.createElement(ReactApp)
    );
    res.render('index.ejs');
});

module.exports = router;