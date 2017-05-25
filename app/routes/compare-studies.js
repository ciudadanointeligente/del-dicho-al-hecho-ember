import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import _ from 'lodash';
import config from '../config/environment';


export default Ember.Route.extend(UtilitiesMixin, CsvParserMixin, {
  titleToken: function(model) {
    return model[0].get('government').get('name') + " - " + model[1].get('government').get('name');
  },
  model(params){
    let studies_name = params.studies.split('~');
    if (studies_name.length < 2){
      this.transitionTo("/404");
    }
    let store = this.get('store');
    let studies = [];

    _.forEach(studies_name , function(st){
      let study = store.peekAll('study').findBy('slug', st);
      if(_.isUndefined(study)){
        this.transitionTo("/404");
      }
      let file_name = config.rootURL + study.get('filename');
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
