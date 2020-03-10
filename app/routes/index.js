import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import _ from 'lodash';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import config from '../config/environment';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  titleToken: function(model) {
    let s1 = ( !_.isUndefined(model[0]) ) ? model[0].name : "";
    let s2 = ( !_.isUndefined(model[1]) ) ? model[1].name : "";
    return s1 + "-" + s2;
  },
  model(){
    let studies = [];
    let study = this.store.peekAll('study').findBy('in_landing');
    if(!_.isUndefined(study)){
      let file_name =config.rootURL +  'studies/' + study.get('filename');
      let s1 = this._parseCsv(file_name, this.store, study);
      studies.push(study);
    }
    let study2 = this.store.peekAll('study').findBy('in_landing_2');
    if(!_.isUndefined(study2)){
      let file_name_2 =config.rootURL +  'studies/' + study2.get('filename');
      let s2 = this._parseCsv(file_name_2, this.store, study2);
      studies.push(study2);
    }
    return studies;
  }
});
