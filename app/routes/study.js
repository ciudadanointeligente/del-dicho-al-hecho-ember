import Ember from 'ember';
// import _ from 'lodash';

export default Ember.Route.extend({
  model(params){
    return this.get('store').peekAll('study').findBy('slug', params.study_name);
  },
});
