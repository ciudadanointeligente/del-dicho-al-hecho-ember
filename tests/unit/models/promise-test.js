import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('promise', 'Unit | Model | promise', {
  // Specify the other units that are required for this test.
  needs: ['model:bill', 'model:study', 'model:area', 'model:phase', 'model:priority', 'model:justification']
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
  let relationship = Ember.get(promise, 'relationshipsByName').get('justifications');
  assert.equal(relationship.key, 'justifications');
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

test('promise completed', function(assert){
  Ember.run.begin();
  let pl1 = this.store().createRecord('bill',{'name':'name01',
                                    'title':'title01',
                                    'fullfilment':'100%',
                                    'coherence': 4
                                   });
  let pl2 = this.store().createRecord('bill',{'name':'name02',
                                    'title':'title02',
                                    'fullfilment':'100%',
                                    'coherence': 1});
  let promise = this.subject({'content': "I'm a content", 'bills':[pl1,pl2]});

  Ember.run.end();
  assert.ok(promise.get('is_completed'));
});
