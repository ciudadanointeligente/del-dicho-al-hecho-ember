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
  }
});
