import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';

export default Ember.Controller.extend(UtilitiesMixin, {
  fullName: function() {
    return this.get('content').get('version') + ' ' + this.get('content').get('year');
  }.property('content'),

  areas: function() {
    let studyAreas = [];
    let id = this._hashCode(this.get('content').get('version') + this.get('content').get('year'));
    let areas = this.get('store').peekAll('area');
    areas.forEach(function(a){
      console.log(a.get('study').get('id'));
      console.log(id);
      if ( parseInt(a.get('study').get('id')) === parseInt(id)){
        studyAreas.push(a);
      }
    });
    return studyAreas;
  }.property('content'),

  idFirstArea: function() {
    return this.get('store').peekAll('area').get('firstObject').get('id');
  }.property('content'),
});
