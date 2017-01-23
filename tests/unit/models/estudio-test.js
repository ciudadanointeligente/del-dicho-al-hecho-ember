import { moduleForModel, test } from 'ember-qunit';

moduleForModel('estudio', 'Unit | Model | estudio', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attributes', function(assert){
    let estudio = this.subject({'edition': 'marzo', 'year': '2016'});
    assert.equal(estudio.get('edition'), 'marzo');
    assert.equal(estudio.get('year'), 2016);
});
