const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require('dotenv');
dotenv.config();



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3080/google/callback",
    passReqToCallback: true
},
    function (req, request, accessToken, refreshToken, profile, done) {
        const url = require('url');

        const state = req.query.state;
        const parsedUrl = url.parse(state, true);

        const user_type = parsedUrl.query.user_type;
       
        const user = {
            profile,
            user_type
        };
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});


