// const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require('dotenv')
// const passport = require('./config/passport.js')
const passport = require("passport")
dotenv.config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/Oauth/google/callback",
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                // Google user information
                const user = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    //   profilePicture: profile.photos?.[0]?.value,
                };


                console.log("Google user:", user);
                // callbackURL: process.env.GOOGLE_CALLBACK_URL

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
    
);


// Store user information in the session
passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

// Retrieve user from the session
passport.deserializeUser(async (googleId, done) => {
    try {

        const user = {
            googleId,
        };

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;