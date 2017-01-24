import { moduleForModel, test } from 'ember-qunit';
import Ember  from 'ember';

moduleForModel('government', 'Unit | Model | government', {
  // Specify the other units that are required for this test.
  needs: ['model:study']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attributes', function(assert){
    let government = this.subject({'name': 'Bachelet 2013-2016'});
    assert.equal(government.get('name'), 'Bachelet 2013-2016');
    assert.ok(Ember.guidFor(government));
});

test("gov has many studies", function(assert){
  let government = this.store().modelFor('government');
  let relationship = Ember.get(government, 'relationshipsByName').get('studies');
  assert.equal(relationship.key, 'studies');
  assert.equal(relationship.kind, 'hasMany');
});
