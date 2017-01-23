import { moduleForModel, test } from 'ember-qunit';

moduleForModel('bill', 'Unit | Model | bill', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attribute', function(assert){
  let test = this.subject({'name': '456-B', 'coherence': 6});
  assert.equal(test.get('name'), '456-B');
  assert.equal(test.get('coherence'), 6);
  assert.equal(test.get('coherence') + 1, 7);
});
