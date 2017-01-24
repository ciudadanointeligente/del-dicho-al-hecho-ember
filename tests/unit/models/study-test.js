import { moduleForModel, test } from 'ember-qunit';

moduleForModel('study', 'Unit | Model | pertito', {
  // Specify the other units that are required for this test.
  needs: ['model:government']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attributes', function(assert){
    let estudio = this.subject({'version': 'marzo', 'year': '2016'});
    assert.equal(estudio.get('version'), 'marzo');
    assert.equal(estudio.get('year'), 2016);
});
