module.exports = {
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bucketlist-node.herokuapp.com'}/auth/facebook/callback`,
    profileURL: 'https://graph.facebook.com/v2.10/me',
    authorizationURL: 'https://www.facebook.com/v2.10/dialog/oauth',
    tokenURL: 'https://graph.facebook.com/v2.10/oauth/access_token',
    profileFields: ['id', 'email', 'first_name', 'middle_name', 'last_name', 'displayName', 'picture'],
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bucketlist-node.herokuapp.com'}/auth/google/callback`,
    profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
  },
};
