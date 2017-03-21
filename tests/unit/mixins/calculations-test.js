import Ember from 'ember';
import CalculationsMixin from 'ddah-ember/mixins/calculations';
import { module, test } from 'qunit';

module('Unit | Mixin | calculations',{
  needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let CalculationsObject = Ember.Object.extend(CalculationsMixin);
  let subject = CalculationsObject.create();
  assert.ok(subject);
});
