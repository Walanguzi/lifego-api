const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../../config');

module.exports = (app) => {
  const transformFacebookProfile = profile => ({
    name: profile.name,
    avatar: profile.picture.data.url,
    email: profile.email,
    username: profile.id,
  });

  const transformGoogleProfile = profile => ({
    name: profile.displayName,
    avatar: profile.image.url,
    email: profile.emails[0].value,
    username: profile.id,
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
  }), (req, res) => res.redirect(`OAuthLogin://login?user=${JSON.stringify(req.user)}`));

  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google',
  }), (req, res) => res.redirect(`OAuthLogin://login?user=${JSON.stringify(req.user)}`));
};
