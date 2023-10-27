const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();


const GOOGLE_CLIENT_ID     = "564593591845-4ggt2o1au2e5i2v8b0ofdc5nujhl67kn.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const port = process.env.PORT ?? '4006'
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:" + port + "/auth/google/callback",
      passReqToCallback: true,
    },
    
    async function (request, accessToken, refreshToken, profile, done) {
      //console.log(profile)
      const EMAIL_ADMIN = 'bicyrent99@gmail.com'
      profile = profile._json;
      profile = {
        googleId: profile.sub,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        isAdmin: profile.email === EMAIL_ADMIN ? true : false
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
