import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:compare-studies', 'Unit | Route | compare studies', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test("returns studies based on URL", function(assert){
  let route = this.subject();
  let params = {
    studies: "bachelet-2014-2018_marzo-2016-piñera-2010-2014_marzo-2012"
  };
  Ember.run.begin();
  let govB = route.get("store").createRecord("government", {"name": "Bachelet-2014-2018"});
  let govP = route.get("store").createRecord("government", {"name": "Piñera-2010-2014"});
  route.get("store").createRecord("study", {"version": "Marzo", "year": 2016, "government": govB});
  route.get("store").createRecord("study", {"version": "Marzo", "year": 2012, "government": govP});
  route.model(params).then(function(studies){
    assert.equal(study.get('version'), "Marzo");
  });
  Ember.run.end();

});
