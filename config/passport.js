var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require("passport-twitter");
var User = require('../models/Users');
var configAuth = require('./auth');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

/*********************
*GITHUB***************
*********************/

    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'github.id': profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    
                    console.log(JSON.stringify(profile, null, 2));

                    newUser.github.id = profile.id;
                    newUser.github.token = profile.token;
                    newUser.github.username = profile.username;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.publicRepos = profile._json.public_repos;
                    newUser.github.avatar = profile['_json'].avatar_url;
                    newUser.github.created = Date.now();

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
/*********************
*TWITTER**************
*********************/
    
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        includeEmail: true

    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err){return done(err);}
                
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    // set all of the user data that we need
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.created = Date.now();
                    newUser.twitter.avatar = profile.photos[0].value;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

};


