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
      let billsArray = e.get('bills');
      billsArray.forEach(function(b){
        fullfilment_bills.push(parseFloat(b.get('fullfilment')));
      });
      return _.round(_.mean(fullfilment_bills), 0);
    } else {
      return 0;
    }
  }}),
  coherenceLevel: DS.attr("number", {defaultValue: function(e){
    let coherence_bills = [];
    if (e.get('bills').toArray().length){
      let billsArray = e.get('bills');
      billsArray.forEach(function(b){
        coherence_bills.push(parseFloat(b.get('coherenceLevel')));
      });
      return _.round(_.mean(coherence_bills), 1);
    } else {
      return 0;
    }
  }}),
});
