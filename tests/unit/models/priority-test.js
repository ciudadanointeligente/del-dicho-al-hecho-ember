import { moduleForModel, test } from 'ember-qunit';
import Ember  from 'ember';

moduleForModel('priority', 'Unit | Model | priority', {
  // Specify the other units that are required for this test.
  needs: ['model:bill', 'model:justification']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('it has attributes', function(assert){
    let priority = this.subject({'name': 'simple'});
    assert.equal(priority.toJSON().name, 'simple');
    assert.equal(priority.toJSON().count, 0);

});

test("priority belongs to bill", function(assert){
  let priority = this.store().modelFor('priority');
  let relationship = Ember.get(priority, 'relationshipsByName').get('bill');
  assert.equal(relationship.key, 'bill');
  assert.equal(relationship.kind, 'belongsTo');
});
