import Ember from 'ember';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import { module, test } from 'qunit';

module('Unit | Mixin | utilities');

// Replace this with your real tests.
test('it works', function(assert) {
  let UtilitiesObject = Ember.Object.extend(UtilitiesMixin);
  let subject = UtilitiesObject.create();

  assert.ok(subject);
  assert.ok(subject._hashCode('Perrito'));
});
