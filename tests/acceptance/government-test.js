import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | government');

test('visiting /government with wrong gov returns 404', function(assert) {
  visit('/government/perrito');

  andThen(function() {
    assert.equal(currentURL(), '/404');
  });
});
