const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    
    async function (request, accessToken, refreshToken, profile, done) {
      //console.log(profile)
      profile = profile._json;
      profile = {
        googleId: profile.sub,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        isAdmin: profile.email === process.env.EMAIL_ADMIN ? true : false
      };
      done(null, profile);  
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
