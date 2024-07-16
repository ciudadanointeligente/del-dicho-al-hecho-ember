import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import config from '../config/environment';
import _ from 'lodash';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  ajax: Ember.inject.service(),
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    let study = this.store.peekAll('study').findBy('id', params.id);
    // TODO: Aqui se imprime el json si es que no existe para ese estudio
    // console.log(study);
    
    if (_.isUndefined(study)){
      this.transitionTo("/404");
    }

    //let file_name =config.rootURL +  'studies/' + study.get('filename');
    
    //return this._parseCsv(file_name, this.store, study);
    return this.get('ajax').request('http://127.0.0.1:8000/get_study_by_id/' + params.id + '/').then((data) => {
      console.log('data->', data)
      this.store.pushPayload(data);
      return study;
    }).catch((error) => {
      console.log('error:', error)
      return error;
    });
  },
});
