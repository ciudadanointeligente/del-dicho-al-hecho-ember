import Ember from 'ember';

export default Ember.Controller.extend({
  fullName: function() {
    return this.get('content').get('version') + ' ' + this.get('content').get('year');
  }.property('content'),

  areas: function() {
    return this.get('store').peekAll('area');
  }.property('content'),

  idFirstArea: function() {
    return this.get('store').peekAll('area').get('firstObject').get('id');
  }.property('content'),
});
