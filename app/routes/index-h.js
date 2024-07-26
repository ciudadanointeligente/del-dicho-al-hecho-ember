import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import config from '../config/environment';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  ajax: Ember.inject.service(),
  titleToken: function(model) {
    return model.get('name');
  },
  model(){
    let study = this.store.peekAll('study').findBy('in_landing');
    return this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + study.get('id') + '/').then((data) => {
      this.store.pushPayload(data);
      return study;
    }).catch((error) => {
      console.log('error:', error)
      return error;
    });
  }
});
