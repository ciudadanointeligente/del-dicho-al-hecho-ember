import { moduleFor, test } from 'ember-qunit';

moduleFor('route:government', 'Unit | Route | government', {
  // Specify the other units that are required for this test.
  needs: ['model:government']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it has gov model', function(assert){
  let route = this.subject();
  let govs = route.model();
  assert.ok(govs);
});
