import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:study', 'Unit | Route | study', {
  // Specify the other units that are required for this test.
  needs: ['route:application', 'model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority"]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test("returns one study based on URL", function(assert){
  let route = this.subject();
  let params = {
    study_name: "bachelet-2014-2018_marzo-2016"
  };
  Ember.run.begin();
  let gov = route.get("store").createRecord("government", {"name": "Bachelet-2014-2018"});
  route.get("store").createRecord("study", {"version": "Mayo", "year": 2016, "government": gov});
  route.get("store").createRecord("study", {"version": "Marzo", "year": 2016, "government": gov});
  route.model(params).then(function(study){
    assert.equal(study.get('version'), "Marzo");
  });
  Ember.run.end();

});

test("study exists and has promises", function(assert){
  let route = this.subject();
  Ember.run.begin();
  let gov = route.get("store").createRecord("government", {"name": "Bachelet-2014-2018"});
  route.get("store").createRecord("study", {"version": "Marzo", "year": 2016, "government": gov, "id": 1});
  Ember.run.end();
  let params = {
    study_name: "bachelet-2014-2018_marzo-2016",
  };
  route.model(params).then(function(study){
    let st = study.get('promises').toArray();
    assert.ok(st.length > 0, "Testeando si estudio tiene promesas");
  });
});
