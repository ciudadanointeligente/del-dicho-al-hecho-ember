import Ember from 'ember';
import PapaParse from 'papaparse';
// import fs from 'ember-filesystem';




export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    PapaParse.parse("http://example.com/file.csv", {
      download: true,
      complete: function(results){
        console.log(results);
      }
    });
    // controller.set('data', data.toString());
  },
});
