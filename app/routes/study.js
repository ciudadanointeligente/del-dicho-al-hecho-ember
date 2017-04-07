import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import config from '../config/environment';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  model(params){
    let study = this.store.peekAll('study').findBy('slug', params.study_name);

    if (typeof study === "undefined"){
      this.transitionTo("/404");
    }

    let file_name =config.rootURL +  'studies/' + study.get('government').get('name') + '_' + study.get('version') + '-' + study.get('year') + '.csv';
    return this._parseCsv(file_name, this.store, study);
  },
});
