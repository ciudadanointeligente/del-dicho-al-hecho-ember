import Ember from 'ember';
// import PapaParse from 'npm:papaparse';

export default Ember.Route.extend({
  model(){
    let study = this.store.peekAll('study').findBy('in_landing');
    return study;
  }
});
