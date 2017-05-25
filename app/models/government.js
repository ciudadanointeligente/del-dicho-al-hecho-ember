import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';

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

    return this.get('studies').filterBy('type', 'Programa').sortBy('year');
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
});
