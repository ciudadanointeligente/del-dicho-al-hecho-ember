import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: ' ¿Qué es?',
  setupController: function(controller, model) {
    this._super(controller, model);
  },
});
