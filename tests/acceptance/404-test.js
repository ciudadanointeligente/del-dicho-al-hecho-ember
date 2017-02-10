import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | 404');

test('visiting /404', function(assert) {
  visit('/404');

  andThen(function() {
    assert.equal(currentURL(), '/404');
    assert.ok(find('.not-found').length);
  });
});
