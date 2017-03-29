import DS from 'ember-data';

export default DS.Model.extend({
  bill: DS.belongsTo('bill'),
  promise: DS.belongsTo('promise'),
  justification: DS.attr('string')
});
