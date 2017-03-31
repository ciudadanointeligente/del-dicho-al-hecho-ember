import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('phase', 'Unit | Model | phase', {
  // Specify the other units that are required for this test.
  needs: ['model:bill', 'model:justification']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('attributes', function(assert){
  let phase = this.subject({'name': "Primer trámite constitucional", "fullfilment": 1/3});
  assert.equal(phase.get('name'), "Primer trámite constitucional");
  assert.equal(phase.get("fullfilment"), 1/3);
});

test("phase has many bills", function(assert){
  let phase = this.store().modelFor('phase');
  let relationship = Ember.get(phase, 'relationshipsByName').get('bills');
  assert.equal(relationship.key, 'bills');
  assert.equal(relationship.kind, 'hasMany');
});
