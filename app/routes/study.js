import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    let result = this.get('store').peekAll('study').toArray()[0];
    return result;
  },
});
