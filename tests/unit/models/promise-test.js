import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('promise', 'Unit | Model | promise', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});


test('it has attributes', function(assert){
    let promise = this.subject({'content': "I'm a content"});
    assert.equal(promise.get('content'), "I'm a content");
    assert.ok(Ember.guidFor(promise));
});
