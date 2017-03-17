import DS from 'ember-data';
import CalculationsMixin from 'ddah-ember/mixins/calculations';

export default DS.Model.extend(CalculationsMixin, {
    name: DS.attr('string'),
    promises: DS.hasMany('promise'),
    getPromisesPerStudy: function(study){
      let area = this;
      return study.get('promises').filter(function(p){
        return area.get('id') === p.get('area').get('id');
      });
    },
    fullfilmentPerStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      return this.getAverageFrom(promises, 'fullfilment');
    },
    coherenceLevelByStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      return this.getAverageFrom(promises, 'coherence');
    },
    getCompletedPromisesByStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      let completed_promises = promises.filter(function(p){
        return p.get('is_completed');
      });
      return completed_promises.length;
    }
    // ,unprocessedPromises
    // ,unprocessedPromises

});
