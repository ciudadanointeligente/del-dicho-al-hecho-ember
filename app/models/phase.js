import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  fullfilment: DS.attr('number'),
  bills: DS.hasMany('bill'),
});
