import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';


export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  ajax: Ember.inject.service(),
  model() {
    return this.get('ajax').request('http://127.0.0.1:8000/get_governments/').then((data) => {
      let gov = this._parseStudiesGovernment(this.store, data.governments, data.phases);
      return gov;
    }).catch((error) => {
      return error;
    });
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
