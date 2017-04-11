import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  model(){
    return this.get('store').peekAll('government');
  }
});
