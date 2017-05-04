import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';


export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  model() {
    return this._parseStudiesGovernment(this.store);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.setCompareUrls(model);
  }

});
