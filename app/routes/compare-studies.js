import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import _ from 'lodash';


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
    // let parseCsv = this._parseCsv.bind(this);

    _.forEach(studies_name , function(st){
      let st_version = capitalize(st.split('_')[1].split('-')[0]);
      let st_year = st.split('_')[1].split('-')[1];
      let study = store.peekRecord('study', hashCode(st_version + st_year));
      if (!study.get('promises').toArray().length) {
        let file_name = '/studies/' + study.get('government').get('name') + '_' + study.get('version') + '-' + study.get('year') + '.csv';
        studies.push(file_name);
      }
    });
      return this._arrayparseCsv(studies,store);

  },
});
