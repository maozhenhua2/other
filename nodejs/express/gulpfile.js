// 载入外挂
var gulp = require('gulp'),

  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon'),

  bs,
  port = 4000,
  app = '.',
  dist = 'dist';


gulp.task('nodererun', function () {
  nodemon({
    script: app + '/bin/WWW',
    ext: 'html js css ejs',
    ignore: ['ignored.js', '.idea'],
    env: {
      PORT: port
    }
  })
    .on('start', function () {
      console.log('start');
      if (!bs) {
        console.log('create bs');
        bs = browserSync.create();
        bs.init({
          proxy: {
            target: 'http://localhost:' + port
          },
          port: port + 1
        });
        bs.watch([
          app + '/**/*.html',
          app + '/**/*.js',
          app + '/**/*.css'
        ]).on('change', function () {
          console.log('*----change----*');
          nodemon.emit('restart');
        });
      }

    })
    .on('restart', function () {
      console.log('restart');
      bs.reload();
    });
});