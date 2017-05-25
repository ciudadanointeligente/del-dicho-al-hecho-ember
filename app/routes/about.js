import Ember from 'ember';

export default Ember.Route.extend({
  title: ' - ¿Qué es?',
  setupController: function(controller, model) {
    this._super(controller, model);
  },
});
