import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

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
  var config_governments =[{
    "name": "Michelle Bachelet",
    "years": "2014-2018",
    "color": "#FF00FF",
    "studies": [{
      "type": "Programa",
      "img": "/img/bashelet-en-el-avion.svg",
      "year": 2016,
      "version": "marzo",
      "name": "Bachelet-2014-2018_Marzo-2016",
      "filename": "test/Bachelet-2014-2018_Marzo-2015.csv"
    }, {
      "type": "Programa",
      "img": "/img/bashelet-con-la-fiera.svg",
      "year": 2015,
      "version": "marzo",
      "name": "Bachelet-2014-2018_Marzo-2015",
      "filename": "test/Bachelet-2014-2018_Marzo-2016.csv"
    }]
  }];
  Ember.run.begin();
  route._parseStudiesGovernment(route.store, config_governments);
  Ember.run.end();
  // Aquí hago como que le pido la url
  // localhost:4200/government/mishelle-bashelet
  let params = {'slug': 'michelle-bachelet'};
  return route.model(params).then(function(government){
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
