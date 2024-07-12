import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';


export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  ajax: Ember.inject.service(),
  model() {
    try {
      return this.get('ajax').request('http://127.0.0.1:8000/get_governments/');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.setCompareUrls(model);
  },
  title: function(tokens) {

    tokens = Ember.makeArray(tokens);
    if(tokens.length && this.controller.currentPath !== 'index'){
      return 'Del Dicho Al Hecho - '+ tokens;
    }
    return 'Del Dicho Al Hecho';
  }

});
