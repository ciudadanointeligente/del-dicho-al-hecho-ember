import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  model(params){
    let gov = this.store.peekAll('government').findBy('slug', params.slug);
    let filenames = [];

    gov.get('studies').forEach(function(s){
      filenames.push( s.get('filename') );
    });

    return this._arrayparseCsv(filenames,this.store);
  }
});
