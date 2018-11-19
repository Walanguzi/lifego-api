const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../../../config');
const socialLogin = require('../../lib/resolvers/users/socialLogin');

module.exports = (app) => {
  const transformFacebookProfile = profile => ({
    displayName: profile.name,
    pictureUrl: profile.picture.data.url,
    email: profile.email,
  });

  const transformGoogleProfile = profile => ({
    displayName: profile.displayName,
    pictureUrl: profile.image.url,
    email: profile.emails[0].value,
  });

  passport.use(new FacebookStrategy(config.facebook, (accessToken, refreshToken, profile, done) => {
    done(null, transformFacebookProfile(profile._json)); // eslint-disable-line no-underscore-dangle
  }));

  passport.use(new GoogleStrategy(config.google, (accessToken, refreshToken, profile, done) => {
    done(null, transformGoogleProfile(profile._json)); // eslint-disable-line no-underscore-dangle
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook',
  }), socialLogin);

  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google',
  }), socialLogin);
};
