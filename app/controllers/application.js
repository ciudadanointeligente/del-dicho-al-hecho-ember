import Ember from 'ember';
import WhatStudiesAreComparableMixin from 'ddah-ember/mixins/what-studies-are-comparable';
import config from '../config/environment';
import _ from 'lodash';

export default Ember.Controller.extend(WhatStudiesAreComparableMixin, {
  setCompareUrls: function(governments){
    let urls = {};
    let comparableStudies = this.comparableStudies(config.governments);
    _.forEach(comparableStudies, function(comparable_studies){
      urls[comparable_studies.version] = [];
      _.forEach(comparable_studies.studies, function(studies){
        let s1 = studies[0];
        let s2 = studies[1];
        let url1;
        let url2;
        let study_comparison = {'study1': undefined,
                                'study2': undefined,
                                'url': undefined};
        governments.forEach(function(gov){
          gov.get('studies').forEach(function(s){
            if(s1.version === s.get('version') && s1.year === s.get('year')){
              url1 = s.get('slug');
              study_comparison.study1 = s;
            }
            if(s2.version === s.get('version') && s2.year === s.get('year')){
              url2 = s.get('slug');
              study_comparison.study2 = s;
            }
          });
        });
        study_comparison.url = url1 + '~' + url2;
        urls[comparable_studies.version].push(study_comparison);
      });
    });
    this.set('compareUrls', urls);
  }
});
