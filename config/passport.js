const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email})
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'The email is not registered'});
                    }
                    // Password Match
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    },
    async(accessToken, refreshToken, profile, done) => {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : undefined;
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: email,
            image: profile.photos[0].value
        }
        try {
            let user = await User.findOne({ googleId: profile.id })

            if (user) {
                return done(null, user)
            } 
            
            user = await User.findOne({ email: email });
            if (user) {
                return done(null, user)
            }
            
            user = await User.create(newUser);
            done(null, user)

        } catch (err) {
            console.error(err)
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};