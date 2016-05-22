const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mongoose = require('mongoose');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const mongoUri = 'mongodb://localhost/test_server';
var children = [];

var client = ['server.js', 'app/**/*.js', '!node_modules/**', '!build/**'];
var server = ['server/**/*.js', '!**/node_modules/**', '!**/db/*'];
var jawoid = ['test/integration/**.js', 'test/unit/**.js','!test/**bundle.**'];

function killCp() {
  children.forEach((child) => {
    child.kill('SIGTERM');
  });
}

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'entry_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('webpack:protractor', () => {
  gulp.src('test/integration/**.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'pro_bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('webpack:karma', () => {
  gulp.src(['./test/unit/test_entry.js'])
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'karma_bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', () => {
  gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('./build'));
});

gulp.task('mongoDb:test', (done) => {
  children.push(cp.spawn('mongod'));
  setTimeout(done, 1000);
});

gulp.task('dropTestDb', ['mongoDb:test'], (done) => {
  mongoose.connect(mongoUri, () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
});

gulp.task('startservers:test', (done) => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.fork('server/index', [], { env: { MONGODB_URI: mongoUri } }));
  setTimeout(done, 1000);
});

gulp.task('protractor:test', ['build:dev', 'startservers:test', 'dropTestDb'], () => {
  gulp.src('test/integration/*_spec.js')
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
    .on('end', () => {
      killCp();
    })
    .on('error', () => {
      killCp();
    });
});

gulp.task('lint:client', () => {
  gulp.src(client)
    .pipe(eslint('app/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  gulp.src(jawoid)
    .pipe(eslint('test/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:server', () => {
  gulp.src(server)
    .pipe(eslint('server/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:client', 'lint:server', 'lint:test']);
gulp.task('test', ['protractor:test', 'webpack:protractor', 'webpack:karma']);
gulp.task('default', ['build:dev', 'lint', 'test']);
