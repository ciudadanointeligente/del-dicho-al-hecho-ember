import DS from 'ember-data';
import _ from 'lodash';
import Ember from 'ember';

export default DS.Model.extend({
  content: DS.attr('string'),
  number: DS.attr('number'),
  title: DS.attr('string'),
  justifications: DS.hasMany('justification'),
  coherenceLevel: DS.attr('number', {defaultValue: 1}),
  bills: Ember.computed('justifications', function(){
    let bs = [];
    this.get('justifications').forEach(function(justification){
      let b = justification.get('bill');
      let b_id = b.get('id');
      let exists = _.some(bs, function(e){return e.get('id') === b_id;});
      if(!exists){
        bs.push(b);
      }
    });
    return bs;
  }),
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
  /*coherenceLevel: DS.attr("number", {defaultValue: function(e){
    let coherence_bills = [];
    if (e.get('bills').toArray().length){
      let billsArray = e.get('bills');
      billsArray.forEach(function(b){
        if (b.get('coherenceLevel')){
          coherence_bills.push(parseFloat(b.get('coherenceLevel')));
        }
      });
      return (coherence_bills.length ? _.mean(coherence_bills) : 1);
    } else {
      return 1;
    }
  }}),*/
  is_completed: DS.attr("boolean", {defaultValue: function(e){
    if(!e.get('bills').length) {
      return false;
    }
    let completed_bills = e.get('bills').filter(function(b){
      return parseInt(b.get('fullfilment')) === 100;
    });
    return completed_bills.length === e.get('bills').toArray().length;
  }}),

  in_progress: DS.attr("boolean", {defaultValue: function(e){
    return _.some(e.get('bills').toArray(), function(b){
      return ( parseInt(b.get('fullfilment')) >= 1 && parseInt(b.get('fullfilment')) <= 99 );
    });
  }}),

  no_progress: DS.attr("boolean", {defaultValue: function(e){
    if(!e.get('bills').length) {
      return true;
    }
    let no_progress_bills = e.get('bills').filter(function(b){
      return parseInt(b.get('fullfilment')) === 0;
    });
    return no_progress_bills.length === e.get('bills').toArray().length;
  }}),

  ja_why: DS.attr('string'),
  jc_why: DS.attr('string')
});
