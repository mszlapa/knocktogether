var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert');


var Buffer = require('buffer').Buffer,
    es = require('event-stream'),
    path = require('path');

// task to combine knockout templates into single file
knocktogether = function (opts) {
    'use strict';

    opts = opts || {};

    return es.map(function (file, cb) {
        try {
            console.info('Combining template: ' + file.path);
            var templateName = path.basename(file.path).replace('.html', '');

           // see http://blog.safaribooksonline.com/2014/01/31/using-external-templates-knockout-js/
            var escapedContents = String(file.contents).replace(/"/g, "\\x22").
                replace(/(\r\n|\n|\r)/gm, "");

            var result = "\tko.templates[\"" + templateName + "\"] = \"" + escapedContents + "\";";

            file.contents = new Buffer(result);
        } catch (err) {
            console.warn('Error caught from knocktogether: ' + err.message + '.');
        }
        cb(null, file);
    });
};

// combine and optionally minifiy javascript
gulp.task('minjs', function () {
    gulp.src('./src/*.js')
        .pipe(insert.prepend('//   ' + new Date()+'\n') )
        .pipe(insert.prepend('//  THIS FILE IS GENERATED DO NO MODIFY \n'))
        // minification off for now       .pipe(uglify())
        .pipe(concat('knocktog.all.js'))
        .pipe(gulp.dest('./js'));
});

// combine knockout templates into single template loading function
gulp.task('knocktogether', function () {
    gulp.src('./templates/*.html')
        //  combine templates into templates.js file:
        .pipe(knocktogether())
        .pipe(concat('templates.js'))
        //  wrap it into knocktog.loadKoTemplates function
        .pipe(insert.prepend('// stringified KO templates\n var knocktog = knocktog || {};\nknocktog.loadKoTemplates = function () {\n'))
        .pipe(insert.append('\n}'))
        .pipe(gulp.dest('./src'));

});

gulp.task('server',function () {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000);
  console.log("Dev webserver started on localhost:4000")
});



// automatically generate combined js on change to js scr or template files
gulp.watch('templates/*.html', ['knocktogether','minjs']);


gulp.task('default', ['knocktogether', 'minjs', 'server']);

