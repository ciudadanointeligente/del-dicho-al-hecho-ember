import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  beforeModel(){
    this._parseStudiesGovernment(this.store);
  },
  model(){
    let study = this.store.peekAll('study').findBy('in_landing');
    return study;
  }
});
