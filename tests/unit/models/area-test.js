import { moduleForModel, test} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('area', 'Unit | Model | area', {
  // Specify the other units that are required for this test.
  needs: ['model:promise', 'model:area', 'model:study']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
    assert.ok(!!model);
});

test('tiene nombre entre sus atributos', function(assert){
    let ar = this.subject({'name': 'nombre'});
    assert.equal(ar.toJSON().name, 'nombre');
});

test("area has many promises", function(assert){
  let area = this.store().modelFor('area');
  let relationship = Ember.get(area, 'relationshipsByName').get('promises');
  assert.equal(relationship.key, 'promises');
  assert.equal(relationship.kind, 'hasMany');
});
