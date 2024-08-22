import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import _ from 'lodash';
import RSVP from 'rsvp';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  ajax: Ember.inject.service(),
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    let gov = this.store.peekAll('government').findBy('id', params.id);
    if (_.isUndefined(gov)){
      this.transitionTo('/404');
    }
    let studyIds = [];

    gov.get('comparable').forEach(function(s){
      studyIds.push( s.get('id') );
    });

    /*return this._arrayparseCsv(filenames,this.store).then(function(){
      return gov;
    });*/

    let parsing_promises = [];


    for (var i = 0; i < studyIds.length; i++) {
      let promiseStudy = this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + studyIds[i] + '/').then((data) => {
        return data;
      }).catch((error) => {
        console.log('error:', error)
        return error;
      });
      parsing_promises.push(promiseStudy);
    };

    let currentStore = this.store;
    return RSVP.allSettled(parsing_promises).then(function(data){
      data.forEach(function(result){
        currentStore.pushPayload(result.value);
      });
      return gov;
    });
  },
  setupController(controller, model){
    this._super(controller, model);
    controller.set('areas', this.store.peekAll('area').sortBy('name'));
  }
});
