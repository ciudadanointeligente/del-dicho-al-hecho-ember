import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import _ from 'lodash';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    let gov = this.store.peekAll('government').findBy('slug', params.slug);
    if (_.isUndefined(gov)){
      this.transitionTo('/404');
    }
    let filenames = [];

    gov.get('comparable').forEach(function(s){
      filenames.push( s.get('filename') );
    });

    return this._arrayparseCsv(filenames,this.store).then(function(){
      return gov;
    });
  },
  setupController(controller, model){
    this._super(controller, model);
    controller.set('areas', this.store.peekAll('area'));
  }
});
