import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    try {
    	Ember.$('[data-toggle="tooltip"]').tooltip();
    }
    catch(err){
    	console.log(err);
    }
  }
});
