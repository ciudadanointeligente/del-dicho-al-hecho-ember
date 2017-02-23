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
      // console.log(e.get('content'));
      // console.log(e.get('bills').toArray().length);
      // console.log(e.get('bills').toArray());
      let billsArray = e.get('bills');
      billsArray.forEach(function(b){
        fullfilment_bills.push(b.get('fullfilment'));
      });
      console.log(_.mean(fullfilment_bills));
      return _.mean(fullfilment_bills);
    } else {
      return 0;
    }
  }}),
});



// fullfilment: DS.attr('number', {defaultValue: function(e){
//   return e.get('phase').get('fullfilment');
// }}),
