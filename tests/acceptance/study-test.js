import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | study');

test('visiting /study', function(assert) {
  visit('/study/bachelet-2014-2018_marzo-2016');

  andThen(function() {
    assert.equal(currentURL(), '/study/bachelet-2014-2018_marzo-2016');
  });
});



test('visting a study that does\'n exist', function(assert){
  visit('study/gatito');

  andThen(function(){
    assert.equal(currentURL(), '/404');
  });
});
