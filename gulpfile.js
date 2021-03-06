const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpJest = require('gulp-jest').default;
const env = require('gulp-env');
const istanbul = require('gulp-istanbul');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3002,
      EXPIRES: 86400,
      FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      SECRET_KEY: process.env.SECRET_KEY,
      MONGODB_URI: process.env.MONGODB_URI,
      NODE_ENV: 'production',
    },
    ignore: ['./node_modules'],
  }).on('restart', () => {
    console.log('Restarting'); // eslint-disable-line no-console
  });
});

gulp.task('dev', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3002,
      EXPIRES: 86400,
      FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      SECRET_KEY: process.env.SECRET_KEY,
      MONGODB_URI: process.env.MONGODB_URI,
      NODE_ENV: 'development',
    },
    ignore: ['./node_modules'],
  }).on('restart', () => {
    console.log('Restarting'); // eslint-disable-line no-console
  });
});

gulp.task('pre-test', () => gulp.src(['./**/*.js'])
  .pipe(istanbul())
  .pipe(istanbul.hookRequire()));

gulp.task('test', () => {
  env({
    vars: {
      NODE_ENV: 'test',
      EXPIRES: 3,
      PORT: 3005,
      MONGODB_URI: 'mongodb://localhost:27017/schedules',
    },
  });

  gulp.src('**/*.spec.js', { read: false })
    .pipe(gulpJest({
      preprocessorIgnorePatterns: [
        '<rootDir>/dist/', '<rootDir>/node_modules/',
      ],
      automock: false,
    }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});
