import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: ' Metodología',
  setupController: function(controller, model) {
    this._super(controller, model);
  },
});
