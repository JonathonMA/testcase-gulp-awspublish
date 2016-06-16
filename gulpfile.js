var gulp = require('gulp')
var path = require('path')
var awspublish = require('gulp-awspublish')
var DEST_DIR = 'dist'

gulp.task("dist", function() {
  var config = {
    bucket: process.env.S3_TEST_BUCKET,
    key: process.env.S3_TEST_KEY,
    secret: process.env.S3_TEST_SECRET
  }

  var publisher = awspublish.create({
    params: {
      Bucket: config.bucket
    },
    accessKeyId: config.key,
    secretAccessKey: config.secret,
  })

  return gulp.src(path.join(DEST_DIR, '**'))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter())
})

gulp.task("default", ["dist"])
