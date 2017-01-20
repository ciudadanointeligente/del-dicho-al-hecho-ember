import { moduleForModel,
    test} from 'ember-qunit';

moduleForModel('area', 'Unit | Model | area', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
    assert.ok(!!model);
});

test('tiene nombre entre sus atributos', function(assert){
    let ar = this.subject({'name': 'nombre'});
    assert.equal(ar.get('name'), 'nombre');
});
