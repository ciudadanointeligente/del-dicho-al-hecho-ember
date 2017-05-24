import DS from 'ember-data';
import CalculationsMixin from 'ddah-ember/mixins/calculations';

export default DS.Model.extend(CalculationsMixin, {
    name: DS.attr('string'),
    promises: DS.hasMany('promise'),
    slug: DS.attr("string", {defaultValue: function(e){
      return (e.get('name')).replace(/\s+/g, '-').toLowerCase();
      },
    }),
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
    getPoliticalWillByStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      let count = 0;
      promises.forEach(function(p){
        if(p.get('justifications').get('length') > 0){
          count += 1;
        }
      });
      return count;

    },
    coherenceLevelByStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      return this.getAverageFrom(promises, 'coherenceLevel');
    },
    getCompletedPromisesByStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      return this.getCompleted(promises);
    },
    getInProgressPromisesByStudy: function(study){
      let promises = this.getPromisesPerStudy(study);
      return this.getInCompleted(promises);
    },
    getNoProgress: function(study){
      let promises = this.getPromisesPerStudy(study);
      return this.getNoProgress(promises);
    },
    capacityByStudy: function(study){
      return this.getCompletedPromisesByStudy(study);

    }
    // ,unprocessedPromises
    // ,unprocessedPromises

});
