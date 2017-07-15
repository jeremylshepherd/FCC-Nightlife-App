
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	},
    
    'twitterAuth' : {
        'consumerKey'         : process.env.TWITTER_CONSUMER,
        'consumerSecret'     : process.env.TWITTER_SECRET,
        'callbackURL'      : process.env.APP_URL + 'auth/twitter/callback'
    }

};