import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | government');

test('visiting /government', function(assert) {
  visit('/government');

  andThen(function() {
    assert.equal(currentURL(), '/government');
    assert.equal(find('.govs').length, 1);
  });
});
