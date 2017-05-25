import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash';

export default DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  justification: DS.attr('string'),
  justifications: DS.hasMany('justification'),
  fullfilment: DS.attr('number', {defaultValue: function(e){
    return ( e.get('phase').get('fullfilment') ? parseInt(e.get('phase').get('fullfilment')) : 0);
  }}),
  version: DS.attr('string'),
  year: DS.attr('string'),
  phase: DS.belongsTo('phase'),
  promises: Ember.computed('justifications', function(){
    let ps = [];
    _.forEach(this.get('justifications').toArray(),function(justification){
      ps.push(justification.get('promise'));
    });
    return ps;
  }),
  priorities: DS.hasMany('priority'),
});
