import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import _ from 'lodash';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import config from '../config/environment';
import RSVP from 'rsvp';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  ajax: Ember.inject.service(),
  titleToken: function(model) {
    let s1 = ( !_.isUndefined(model[0]) ) ? model[0].name : "";
    let s2 = ( !_.isUndefined(model[1]) ) ? model[1].name : "";
    return s1 + "-" + s2;
  },
  model(){
    let studies = [];
    let study = this.store.peekAll('study').findBy('in_landing');
    let parsing_promises = [];
    if(!_.isUndefined(study)){
      parsing_promises.push(this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + study.get('id') + '/').then((data) => {
        this.store.pushPayload(data);
        return study;
      }).catch((error) => {
        console.log('error:', error)
        return error;
      }));
    }
    let study2 = this.store.peekAll('study').findBy('in_landing_2');
    if(!_.isUndefined(study2)){
      parsing_promises.push(this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + study.get('id') + '/').then((data) => {
        this.store.pushPayload(data);
        return study2;
      }).catch((error) => {
        console.log('error:', error)
        return error;
      }));
    }
    let tmpStore = this.store;
    return RSVP.allSettled(parsing_promises).then(function(array){
      let _studies = [];
      array.forEach(function(result){
        let s = tmpStore.peekRecord('study', result.value.get('id'));
        _studies.push(s);
      });
      return _studies;
    });
  }
});
