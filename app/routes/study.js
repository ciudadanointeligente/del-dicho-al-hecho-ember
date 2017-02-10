import Ember from 'ember';
// import _ from 'lodash';

export default Ember.Route.extend({
  model(params){
    let study = this.get('store').peekAll('study').findBy('slug', params.study_name);
    if (typeof study === "undefined"){
      this.transitionTo("/404");
    }
    return study;
  },
});
