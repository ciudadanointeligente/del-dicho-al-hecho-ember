import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  coherenceLevel: DS.attr('string'),
  justification: DS.attr('string'),
  fullfilment: DS.attr('number'),
  coherence: DS.attr('number'),
  phase: DS.belongsTo('phase'),
  promise: DS.belongsTo('promise'),

});
