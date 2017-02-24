import DS from 'ember-data';
import _ from 'lodash';

export default DS.Model.extend({
    name: DS.attr('string'),
    promises: DS.hasMany('promise'),
    study: DS.belongsTo('study'),
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
    completePromises: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) === 100){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    unprocessedPromises: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) === 0 ){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    progressPromises: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) !== 0 && parseInt(p.get('fullfilment')) !== 100 ){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
});
