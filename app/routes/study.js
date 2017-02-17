import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
// import _ from 'lodash';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  model(params){
    let study = this.get('store').peekAll('study').findBy('slug', params.study_name);
    if (typeof study === "undefined"){
      this.transitionTo("/404");
    }
    return study;
  },
});
