import Ember from 'ember';
import _ from 'lodash';

export default Ember.Mixin.create({
  getAverageFrom: function(promises, what_from_bills){
    let sum = 0;
    let bills = 0;

    _.forEach(promises, function(p){
      _.forEach(p.get('bills').toArray(), function(b){
        sum = sum + parseInt(b.get(what_from_bills));
        bills++;
      });
    });
    if(bills){
      return Math.floor(sum/bills);
    }
    return 0;
  }
});
