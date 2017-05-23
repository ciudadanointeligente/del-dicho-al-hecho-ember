import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  didInsertElement: function() {
     
    let f = Ember.$('[data-toggle="tooltip"]').tooltip;
    if(!_.isUndefined(f)){
      f();
    }
  }
});
