import DS from 'ember-data';
import _ from 'lodash';
import Ember from 'ember';
import CalculationsMixin from 'ddah-ember/mixins/calculations';
import config from '../config/environment';

let orders = {
  1: 'primer',
  2: 'segundo',
  3: 'tercer',
  4: 'cuarto'
};

export default DS.Model.extend(CalculationsMixin, {
    version: DS.attr('string'),
    year: DS.attr('number'),
    promises: DS.hasMany('promise'),
    color: DS.attr('string'),
    government: DS.belongsTo('government'),
    filename: DS.attr('string'),
    in_landing: DS.attr('boolean', { defaultValue: false }),
    visible: DS.attr('boolean', { defaultValue: false }),
    image: DS.attr('string'),
    type: DS.attr('string'),
    name: DS.attr('string'),
    description: DS.attr('string'),
    slug: DS.attr("string", {defaultValue: function(e){
      let gov = e.get("government");
      return (gov.get("name") + "_" + e.get("version") + "-" + e.get("year")).replace(/\s+/g, '-').toLowerCase();
      },
    }),
    order: Ember.computed('government', 'year', function() {
      let gov_year = this.get('government').get('start_year');
      
      let n = this.get('year') - gov_year;
      return orders[n];
    }),
    isVisible: Ember.computed('visible', function() {
      if(config.environment === "development"){
        return true;
      }
      return this.get('visible');
    }),
    fullName: Ember.computed('version', 'year', function() {
      return `${this.get('version')} ${this.get('year')}`;
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
    bills: Ember.computed('promises', function(){
      let bills = [];
      let promises = this.get('promises');
      promises.forEach(function(p){
        bills = bills.concat(p.get('bills'));
      });
      return bills.uniqBy('id');
    }),
    billsCount: Ember.computed('bills', function(){
      return this.get('bills').length;
    }),
    urgenciesCount: Ember.computed('bills', function(){
      let count = 0;
      this.get('bills').forEach(function(b){
        b.get('priorities').forEach(function(priority){
          count += parseInt(priority.get('count'));
        });
      });
      return count;
    }),
    capacity: DS.attr("number", {defaultValue: function(e){
      return e.get('promises').filterBy('is_completed').length;
    }}),
    presentanAvance: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) > 0){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    finalizadas: DS.attr("number", {defaultValue: function(e){
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
    enDesarrollo: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if(parseInt(p.get('fullfilment')) > 39 && parseInt(p.get('fullfilment')) < 91){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    capacidad: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if(parseInt(p.get('fullfilment')) === 100 && parseInt(p.get('coherenceLevel')) === 4){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    chartDataFront : Ember.computed('fullfilment', function() {
      return {
          labels: [],
          datasets: [
              {
                  data: [this.get('fullfilment'), 100-this.get('fullfilment')],
                  backgroundColor: [
                      this.get("government").get("color1"),
                      "#FFFFFF",
                  ],
                  hoverBackgroundColor: [
                      this.get("government").get("color2"),
                      "#FFFFFF",
                  ]
              }]
      };
    }),
    chartData : Ember.computed('fullfilment', function() {
      return {
          labels: [],
          datasets: [
              {
                  data: [this.get('fullfilment'), 100-this.get('fullfilment')],
                  backgroundColor: [
                      this.get("government").get("color1"),
                      this.get("government").get("color4"),
                  ],
                  hoverBackgroundColor: [
                      this.get("government").get("color2"),
                      this.get("government").get("color3"),
                  ]
              }]
      };
    }),
    doughnutOpt: {
      responsive: true,
      cutoutPercentage: 73
    },
    areas: Ember.computed('promises',function(){
      let a = [];
      this.get('promises').toArray().forEach(function(p){
        let area = p.get('area');
        let area_id = area.get('id');
        let exist = _.some(a, function(e){ return e.get('id') === area_id; });
        if( !exist ){
          a.push( area );
        }
      });
      return a;
    }),
    promisesGroupedByArea: Ember.computed('promises', function(){
      let groupedPromises = {};
      let promises = this.get('promises').toArray();
      let study = this;

      _.each(promises, function(p){
        let area = p.get('area');
        let area_id = area.get('id');
        if(_.isUndefined(groupedPromises[area_id])) {
          groupedPromises[area_id] = {'area':area, 'promises':[p], 'summary':{'completed':0, 'in_progress':0, 'no_progress':0, 'fullfilment':0, 'coherenceLevel':0}};
        } else {
          groupedPromises[area_id].promises.push(p);
        }
      });
      _.each(groupedPromises, function(a, a_id){
        groupedPromises[a_id].summary.completed = study.getCompleted(a.promises);
        groupedPromises[a_id].summary.in_progress = study.getInProgress(a.promises);
        groupedPromises[a_id].summary.no_progress = study.getNoProgress(a.promises);
        groupedPromises[a_id].summary.fullfilment = study.getAverageFrom(a.promises, 'fullfilment');
        groupedPromises[a_id].summary.coherenceLevel = study.getAverageFrom(a.promises, 'coherenceLevel');
      });

      return _.sortBy(groupedPromises, function(o){return o.area.get('name');});
    }),
    getPromisesByArea: function(area){
      let promises = [];
      _.forEach(this.get('promises').toArray(), function(promise){
        if(promise.get('area').get('id') === area.get('id')){
          promises.push(promise);
        }
      });
      return promises;
    }
});
