import { test } from 'qunit';
import moduleForAcceptance from 'ddah-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | study');



test('visting a study that does\'n exist', function(assert){
  visit('study/gatito');

  andThen(function(){
    assert.equal(currentURL(), '/404');
  });
});
