import Ember from 'ember';
import _ from 'lodash';

let defaults = {
  'coherenceLevel':{
    'returnValue': 1,
    'fix_division': 1
  }
};

export default Ember.Mixin.create({
  getAverageFrom: function(promises, what_from_bills){
    let sum = 0;
    let cnt = promises.length;
    let has_defaults = _.some(Object.keys(defaults), function(o) {return o === what_from_bills; });

    _.forEach(promises, function(p){
      sum = sum + parseFloat(p.get(what_from_bills));

    });

    if(cnt){
      let fix = 0;
      if(has_defaults){
        fix = defaults[what_from_bills].fix_division;
      }
      return (sum/cnt).toFixed(fix);
    }
    if(has_defaults){
      return defaults[what_from_bills].returnValue;
    }
    return 0;
  },
  getCompleted: function(promises){
    let completed_promises = promises.filter(function(p){
      return p.get('is_completed');
    });
    return completed_promises.length;
  },
  getInProgress: function(promises){
    let completed_in_progress = promises.filter(function(p){
      return p.get('in_progress');
    });
    return completed_in_progress.length;
  },
  getNoProgress: function(promises){
    let completed_no_progress = promises.filter(function(p){
      return p.get('no_progress');
    });
    return completed_no_progress.length;
  }
});
