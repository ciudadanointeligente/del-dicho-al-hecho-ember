import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | study');



test('visting a study that does\'n exist', function(assert){
  visit('study/gatito');

  andThen(function(){
    assert.equal(currentURL(), '/404');
  });
});

test('visiting a valid study', function(assert){
    visit("/study/michelle-bachelet_marzo-2017");

  andThen(function(){
    assert.equal(currentURL(), '/study/michelle-bachelet_marzo-2017');
  });
});
