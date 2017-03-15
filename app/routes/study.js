import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
// import _ from 'lodash';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  setupController: function(controller, study) {
      controller.set('model', study);
  },
  model(params){
    let study = this.get('store').peekAll('study').findBy('slug', params.study_name);
    if (typeof study === "undefined"){
      this.transitionTo("/404");
    }
    let file_name = '/studies/' + study.get('government').get('name') + '_' + study.get('version') + '-' + study.get('year') + '.csv';
    return this._parseCsv(file_name, this.get('store'), study);
  },
});
