import Ember from 'ember';
import _ from 'lodash';

export default Ember.Mixin.create({
  getAverageFrom: function(promises, what_from_bills){
    let sum = 0;
    //let bills = 0;

    _.forEach(promises, function(p){
      sum = sum + parseInt(p.get(what_from_bills));
    });

    if(sum){
      let r = (sum/promises.length).toFixed(0);
      if(what_from_bills === 'coherenceLevel'){
        r = Math.floor(sum/promises.length).toFixed(1);
      }
      return r;
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
