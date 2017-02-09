import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | study');

test('visiting /study', function(assert) {
  visit('/study/Bachelet-2014-2018_Marzo-2016');

  andThen(function() {
    assert.equal(currentURL(), '/study/Bachelet-2014-2018_Marzo-2016');
  });
});
