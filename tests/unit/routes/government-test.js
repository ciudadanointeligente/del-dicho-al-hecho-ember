import { moduleFor, test } from 'ember-qunit';

moduleFor('route:government', 'Unit | Route | government', {
  // Specify the other units that are required for this test.
  needs: ['model:promise', 'model:area', 'model:study', 'model:government',
          'model:bill', 'model:phase', 'model:priority', 'model:justification',
          'route:application'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('visiting a returns one government', function(assert){
  let route = this.subject();
  // Primero creo el gobierno.
  route._parseStudiesGovernment(this.store);
  // Aquí hago como que le pido la url
  // localhost:4200/government/mishelle-bashelet
  let params = {'slug': 'mishelle-bashelet'};
  route.model(params).then(function(government){
    // Me debo asegurar que el metodo model() retorna la instancia del gobierno
    // además me debo asegurar que vienen todos procesados con
    // promesas y bills y toda la cacha de la espada.
    assert.ok(government.get('studies'));
    assert.equal(government.get('slug'), params.slug);
    government.get('studies').forEach(function(study){
      assert.ok(study.get('promises').toArray().length);
      assert.equal(study.get('government').get('slug'), params.slug);
    });

  });

});
