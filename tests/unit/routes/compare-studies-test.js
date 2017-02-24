import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';

moduleFor('route:compare-studies', 'Unit | Route | compare studies', {
  // Specify the other units that are required for this test.

  needs: ['model:government', 'model:study', 'model:promise', 'model:area', 'model:priority', 'model:bill', 'model:phase']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test("returns studies based on URL", function(assert){
  let route = this.subject();
  let UtilitiesObject = Ember.Object.extend(UtilitiesMixin);
  let subject = UtilitiesObject.create();
  let params = {
    studies: "bachelet-2014-2018_marzo-2016~bachelet-2014-2018_marzo-2015"
  };

  Ember.run.begin();
  let govB = route.get("store").createRecord("government", {"name": "Bachelet-2014-2018"});
  route.get("store").createRecord("study", {"id": subject._hashCode("Marzo" + "2016"), "version": "Marzo", "year": 2016, "government": govB});
  route.get("store").createRecord("study", {"id": subject._hashCode("Marzo" + "2015"), "version": "Marzo", "year": 2015, "government": govB});


  route.model(params).then(function(studies){
    assert.ok(studies.get('firstObject').get('promises').toArray().length > 0);
  });

  Ember.run.end();

});
