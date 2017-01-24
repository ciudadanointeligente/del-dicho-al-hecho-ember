import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('promise', 'Unit | Model | promise', {
  // Specify the other units that are required for this test.
  needs: ['model:bill', 'model:study', 'model:area']
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

test("promise has many bills", function(assert){
  let promise = this.store().modelFor('promise');
  let relationship = Ember.get(promise, 'relationshipsByName').get('bills');
  assert.equal(relationship.key, 'bills');
  assert.equal(relationship.kind, 'hasMany');
});

test("promise belongs to study", function(assert){
  let promise = this.store().modelFor('promise');
  let relationship = Ember.get(promise, 'relationshipsByName').get('study');
  assert.equal(relationship.key, 'study');
  assert.equal(relationship.kind, 'belongsTo');
});

test("promise belongs to area", function(assert){
  let promise = this.store().modelFor('promise');
  let relationship = Ember.get(promise, 'relationshipsByName').get('area');
  assert.equal(relationship.key, 'area');
  assert.equal(relationship.kind, 'belongsTo');
});
