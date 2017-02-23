import DS from 'ember-data';
import _ from 'lodash';

export default DS.Model.extend({
    version: DS.attr('string'),
    year: DS.attr('number'),
    promises: DS.hasMany('promise'),
    areas: DS.hasMany('area'),
    government: DS.belongsTo('government'),
    slug: DS.attr("string", {defaultValue: function(e){
      let gov = e.get("government");
      return (gov.get("name") + "_" + e.get("version") + "-" + e.get("year")).toLowerCase();
      },
    }),
    fullfilment: DS.attr("number", {defaultValue: function(e){
      let fullfilment_promises = [];
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          fullfilment_promises.push(parseFloat(p.get('fullfilment')));
        });
        return _.round(_.mean(fullfilment_promises), 0);
      } else {
        return 0;
      }
    }}),
    coherenceLevel: DS.attr("number", {defaultValue: function(e){
      let coherence_promises = [];
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          coherence_promises.push(parseFloat(p.get('coherenceLevel')));
        });
        return _.round(_.mean(coherence_promises),1);
      } else {
        return 0;
      }
    }}),
});
