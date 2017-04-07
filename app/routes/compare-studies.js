import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import _ from 'lodash';
import config from '../config/environment';


export default Ember.Route.extend(UtilitiesMixin, CsvParserMixin, {
  model(params){
    let studies_name = params.studies.split('~');
    if (studies_name.length < 2){
      this.transitionTo("/404");
    }
    let store = this.get('store');
    let hashCode = this._hashCode;
    let capitalize = this._capitalize;
    let studies = [];

    _.forEach(studies_name , function(st){
      let st_version = capitalize(st.split('_')[1].split('-')[0]);
      let st_year = st.split('_')[1].split('-')[1];
      let study = store.peekRecord('study', hashCode(st_version + st_year));
      let file_name = config.rootURL + 'studies/' + study.get('government').get('name') + '_' + study.get('version') + '-' + study.get('year') + '.csv';
      studies.push(file_name);
    });
    let r = this._arrayparseCsv(studies,store);
    return r;

  },
  setupController(controller, model){
    this._super(controller, model);
    controller.set('areas', this.store.peekAll('area'));
  }
});
