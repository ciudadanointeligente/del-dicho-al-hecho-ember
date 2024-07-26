import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import _ from 'lodash';
import config from '../config/environment';
import RSVP from 'rsvp';


export default Ember.Route.extend(UtilitiesMixin, CsvParserMixin, {
  ajax: Ember.inject.service(),
  titleToken: function(model) {
    return model[0].get('government').get('name') + " - " + model[1].get('government').get('name');
  },
  model(params){
    let store = this.get('store');
    let studyIds = params.studies.split('~');
    if (studyIds.length < 2){
      this.transitionTo("/404");
    }

    let study = store.peekRecord('study', studyIds[0]);
    let parsing_promises = [];
    if(!_.isUndefined(study)){
      parsing_promises.push(this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + studyIds[0] + '/').then((data) => {
        this.store.pushPayload(data);
        return study;
      }).catch((error) => {
        console.log('error:', error)
        return error;
      }));
    }
    let study2 = store.peekRecord('study', studyIds[1]);
    if(!_.isUndefined(study2)){
      parsing_promises.push(this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + studyIds[1] + '/').then((data) => {
        this.store.pushPayload(data);
        return study2;
      }).catch((error) => {
        console.log('error:', error)
        return error;
      }));
    }
    
    return RSVP.allSettled(parsing_promises).then(function(array){
      let _studies = [];
      array.forEach(function(result){
        let s = store.peekRecord('study', result.value.get('id'));
        _studies.push(s);
      });
      return _studies;
    });
  },
  setupController(controller, model){
    this._super(controller, model);
    controller.set('areas', this.store.peekAll('area'));
  }
});
