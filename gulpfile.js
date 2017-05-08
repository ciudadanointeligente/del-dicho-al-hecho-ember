var gulp = require('gulp');
var config = require('./config/environment.js')();
var _ = require('lodash');
var parser = require('./parser.js');
var fs = require('fs');
var PapaParse = require('papaparse');


let keys_that_can_be_empty = ['justification'];

gulp.task('default', function() {
  _.forEach(config.governments, function(gov, i){
    _.forEach(gov.studies, function(study){
      let filename = './public/studies/' + study.filename;
      let slug = (gov.name + "_" + study.version + "-" + study.year).replace(/\s+/g, '-').toLowerCase();
      fs.readFile(filename, 'utf8', function(err, data) {
          if (err) throw err;
          study.government = gov;
          study.slug = slug;
          study.id = parser._hashCode(study.version + study.year);
          parser.papaparseCsvAndSaveJSON(data, study);
      });
      //


    });
  });
});
