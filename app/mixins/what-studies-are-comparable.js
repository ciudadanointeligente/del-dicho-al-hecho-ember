import Ember from 'ember';
import _ from 'lodash';
import config from '../config/environment';


export default Ember.Mixin.create({
  isComparable: function(study){
    return study.type === config.comparable_with_other_gov;
  },
  determinePreviousStudy: function(study){
    return study.year - config.government_length;
  },
  comparableStudies: function(govs){
    govs = _.sortBy(govs, function(g){ return g.years.start; });
    let result = {
      'version': config.comparable_with_other_gov,
      'studies': []
    };
    let determinePreviousStudy = this.determinePreviousStudy;
    let isComparable = this.isComparable;
    let checkForOtherStudies = function(study){
      if(isComparable(study)){
        let year = determinePreviousStudy(study);
        _.forEach(govs, function(gov){

          _.forEach(gov.studies,function(s){
            if(s.year === year && isComparable(s)){
              result.studies.push([{'version': study.version, 'year': study.year},
                           {'version': s.version, 'year': s.year}]);
            }
          });
        });
      }
    };
    while(govs.length > 0){

      let initial_gov = govs.pop();
      _.forEach(initial_gov.studies, checkForOtherStudies);
    }
    return [result];
  }
});
