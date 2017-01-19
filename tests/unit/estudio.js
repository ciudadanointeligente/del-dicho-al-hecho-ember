import {
      moduleForModel,
      test,
      equal
} from 'ember-qunit';
moduleForModel('estudio', 'Estudio model');

test('instanciate', function(){
    var estudio = this.estudio('marzo', 2016);
    equal(estudio.get('edition'), 'marzo');
    equal(estudio.get('year'), 2016);

});
