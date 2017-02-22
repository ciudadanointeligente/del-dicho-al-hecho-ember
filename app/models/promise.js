import DS from 'ember-data';
import _ from 'lodash';

export default DS.Model.extend({
  content: DS.attr('string'),
  number: DS.attr('number'),
  title: DS.attr('string'),
  bills: DS.hasMany('bill'),
  study: DS.belongsTo('study'),
  area: DS.belongsTo('area'),
  fullfilment: DS.attr("number", {defaultValue: function(e){
    let fullfilment_bills = [];
    if (e.get('bills').toArray().length){
      _.forEach(e.get('bills'), function(b){
        console.log(b.get('fullfilment'));
        fullfilment_bills.push(1);
      });
      return _.mean(fullfilment_bills);
    } else {
      return 0;
    }
  }}),
});
