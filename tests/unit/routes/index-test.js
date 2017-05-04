import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:index', 'Unit | Route | index', {
  needs: ['route:application', 'model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

test('/ route model() returns a study', function(assert) {
  assert.expect(2);
  let route = this.subject();

  Ember.run.begin();
  let gov = route.get("store").createRecord("government", {"name": "Bachelet-2014-2018"});
  let s1 = route.get("store").createRecord("study", {"version": "Marzo",
   "filename": "test/Bachelet-2014-2018_Marzo-2016.csv",
   "year": 2017,
   "government": gov,
   "in_landing": true,
   "id": 1});
   route.get("store").createRecord("study", {"version": "Marzo",
    "filename": "test/Bachelet-2014-2018_Marzo-2016.csv",
    "year": 2016,
    "government": gov,
    "id": 2});
  Ember.run.end();

  return route.model().then(function(study){
    assert.equal(study.get('id'), s1.get('id'));
    assert.ok(study.get('promises').toArray().length);
  });


});
