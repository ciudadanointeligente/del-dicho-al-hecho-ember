import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';
import _ from 'lodash';

export default DS.Model.extend({
  name: DS.attr('string'),
  studies: DS.hasMany('study'),
  start_year: DS.attr('number'),
  end_year: DS.attr('number'),
  color1: DS.attr('string'),
  color2: DS.attr('string'),
  color3: DS.attr('string'),
  color4: DS.attr('string'),
  slug: DS.attr('string', {defaultValue: function(e){
    let gov = e.get('name');
    return gov.replace(/\s+/g, '-').toLowerCase();
  }}),
  comparable: Ember.computed('studies', function(){

    return this.get('studies').filterBy('type', config.comparable_with_other_gov).sortBy('year');
  }),
  comparablePromises: Ember.computed('comparable', function(){
    return this.get('comparable').get('lastObject').get('promises').get('length');
  }),
  hasVisibleStudies: Ember.computed('studies', function(){
    if(config.environment === "development"){
      return true;
    }

    let s = this.get('studies').filterBy('visible');
    if(s.length > 0){
      return true;
    }
    return false;
  }),
  getFulfillmentPerArea: function(area){
    let s = this.get('studies').sortBy('year').filterBy('type', config.comparable_with_other_gov);
    let r = [];
    s.forEach(function(item){
      r.push({
        'study': item,
        'fulfillment': area.fullfilmentPerStudy(item)});
    });

    return r;

  },
  getFulfillmentPerAreaDiff: function(area){
    let areas = this.getFulfillmentPerArea(area);
    let i = 0;
    let r = [];
    while (i < areas.length){
      let diff;
      if(!_.isUndefined(areas[i -1])){
        diff = parseInt(areas[i].fulfillment) - parseInt(areas[i -1].fulfillment);
      }
      else {
        diff = parseInt(areas[i].fulfillment);
      }
      let negative = false;
      if (diff < 0){
        negative = true;
      }
      r[i] = {
          'study': areas[i].study,
          'fulfillment': diff,
          'negative': negative,
          'original_fulfillment': areas[i].fulfillment
        };
      i++;
    }
    return r;
  }
});
