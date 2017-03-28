import DS from 'ember-data';
import _ from 'lodash';

export default DS.Model.extend({
  content: DS.attr('string'),
  number: DS.attr('number'),
  title: DS.attr('string'),
  bills: DS.hasMany('bill'),
  study: DS.belongsTo('study'),
  area: DS.belongsTo('area'),
  urgenciesCount: DS.attr("number", {defaultValue: function(e){
    let count = 0;
    if (e.get('bills').toArray().length){
      let billsArray = e.get('bills');
      billsArray.forEach(function(b){
        let prioritiesArray = b.get('priorities');
        prioritiesArray.forEach(function(priority){
          count = count + parseInt(priority.get('count'));
        });
      });
      return count;
    } else {
      return 0;
    }
  }}),
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
        if (b.get('coherenceLevel')){
          coherence_bills.push(parseFloat(b.get('coherenceLevel')));
        }
      });
      return (coherence_bills.length ? _.round(_.mean(coherence_bills), 1) : 0);
    } else {
      return 1;
    }
  }}),
  is_completed: DS.attr("boolean", {defaultValue: function(e){
    let completed_bills = e.get('bills').filter(function(b){
      return parseInt(b.get('fullfilment')) === 100;
    });
    return completed_bills.length === e.get('bills').toArray().length;
  }}),

});
