import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:study', 'Unit | Route | study', {
  // Specify the other units that are required for this test.
  needs: ['route:application', 'model:study', "model:promise", "model:government"]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
test("returns one study based on URL", function(assert){
  let route = this.subject();
  let params = {
    study_name: "fieraferoz_marzo-2016"
  };
  Ember.run.begin();
  let gov = route.get("store").createRecord("government", {"name": "FieraFeroz"});
  route.get("store").createRecord("study", {"version": "Mayo", "year": 2016, "government": gov});
  route.get("store").createRecord("study", {"version": "Marzo", "year": 2016, "government": gov});
  let study = route.model(params);
  assert.equal(study.get('version'), "Marzo");
  Ember.run.end();
});
