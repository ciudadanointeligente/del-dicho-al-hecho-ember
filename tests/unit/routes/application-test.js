import { moduleFor, test } from 'ember-qunit';
import 'ember-data';
import Ember  from 'ember';
import _ from 'lodash';

moduleFor('route:application', 'Unit | Route | application', {
  needs: ['model:bill', 'model:promise', 'model:study', 'model:government', 'model:area', 'model:phase', 'model:priority'],
  beforeEach: function(){
    this.inject.service('store');
  }
});


test("automatically loads data", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){
      this.subject().parseCsv("test/Bachelet-2014-2018_Marzo-2016.csv").then(function(){
      let bills = store.peekAll('bill');
      assert.ok(bills.toArray().length === 7, "Hay 7 bills:" + bills.toArray().length);
      let promises = store.peekAll('promise');
      assert.ok(promises.toArray().length > 0);
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});


test("bill has promise, priority and phase", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){

    this.subject().parseCsv("test/Bachelet-2014-2018_Marzo-2016.csv").then(function(){


      let expected_promise = store.peekRecord('promise', "26");
      let bill = store.peekRecord('bill', "906907");
      assert.equal(bill.get('promise').get('id'), expected_promise.id);
      assert.equal(bill.get('phase').get('name'), "Promulgado");
      assert.ok(bill.get('priorities').toArray()[0].toJSON().name, "Priority has name:" + bill.get('priorities').toArray()[0].toJSON().name);
      assert.equal(bill.get('priorities').findBy('name', 'Inmediata').get('count'), 3);
      assert.equal(bill.get('priorities').findBy('name', 'Suma').get('count'), 2);
      assert.equal(bill.get('priorities').findBy('name', 'Simple').get('count'), 1);
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});


test("promise has many bills and an area", function(assert){
  var done = assert.async();
  var store = this.store;
  Ember.run.begin();
  let estudio = store.createRecord('study',{"version":"marzo","year":"2016"});
  Ember.run.end();

  let assertions = function(){
    this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store,estudio).then(function(){
      let expected_promise = store.peekAll('promise').toArray().findBy('number', 26);
      let bill = store.peekAll('bill').toArray().findBy('name', '9069-07' );
      let bill2 = store.peekAll('bill').toArray().findBy('name', '10344-06' );
      assert.equal(bill.get('promise').get('id'), expected_promise.id);
      assert.equal(bill2.get('promise').get('id'), expected_promise.id);
      let promises = store.peekAll('promise');
      assert.equal(promises.toArray().length, 26);
      assert.equal(expected_promise.get('area').get('name'), "Democracia");
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});




test('matches csv with model attributes', function(assert){
  let route = this.subject();

  let row_from_csv = {
  	"id": "1",
  	"Ano": "2016",
  	"Version": "mayo",
  	"area": "Democracia",
  	"promesa": 'Hola esto es una promesa',
  	"avance_total": "40%",
  	"coherencia": "4",
  	"boletin": "10344-06",
  	"titulo_proyecto": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
  	"link": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
  	"PrimerTramite": "1",
  	"Veto": "",
  	"Insistencia": "",
  	"SegundoTercerTramite": "",
  	"ComisionMixta": "",
  	"TribunalConstitucional": "",
  	"AprobacionPresidencial": "",
  	"Promulgado": "",
  	"RechazadoRetirado": "",
  	"Avance": "0,4",
  	"Simple": "1",
  	"Suma": "",
  	"Inmediata": "",
  	"Total": "1",
  	"Marginal": "",
  	"ParcialMinima": "",
  	"ParcialAlto": "",
  	"EscalaCoherencia": "4",
  	"Justificacion": "Esto es un perrito"
  };

  let resulting_data = route._parseAttributes(row_from_csv);
  let parsed_promise = _.find(resulting_data, {type:'promise'});
  assert.equal(parsed_promise.id, 1);
  assert.equal(parsed_promise.attributes.content, 'Hola esto es una promesa');

  let parsed_bill = _.find(resulting_data, {type:'bill'});
  assert.equal(parsed_bill.id, 1034406);
  assert.equal(parsed_bill.attributes.name, "10344-06");
  let simple = _.find(parsed_bill.relationships.priorities.data, {'id': route._hashCode(parsed_bill.id + "Simple")});
  assert.ok(simple.type);

});
test('doesnt return anything', function(assert){
  let route = this.subject();

  let row_from_csv = {
  	"id": "",
  	"Ano": "",
  	"Version": "",
  	"area": "",
  	"promesa": '',
  	"avance_total": "",
  	"coherencia": "",
  	"boletin": "",
  	"titulo_proyecto": "perrito",
  	"link": "",
  	"PrimerTramite": "",
  	"Veto": "",
  	"Insistencia": "",
  	"SegundoTercerTramite": "",
  	"ComisionMixta": "",
  	"TribunalConstitucional": "",
  	"AprobacionPresidencial": "",
  	"Promulgado": "",
  	"RechazadoRetirado": "",
  	"Avance": "",
  	"Simple": "",
  	"Suma": "",
  	"Inmediata": "",
  	"Total": "",
  	"Marginal": "",
  	"ParcialMinima": "",
  	"ParcialAlto": "",
  	"EscalaCoherencia": "",
  	"Justificacion": "Esto es un perrito"
  };

  let resulting_data = route._parseAttributes(row_from_csv);
  assert.notOk(resulting_data.length);

});



test("it has studies and government", function(assert){
  let route = this.subject();
  var store = this.store;
  route._parseStudiesGovernment(store);
  let studies = store.peekAll('study');
  assert.ok(studies.toArray().length > 0);
  let gov = store.peekAll('government');
  assert.ok(gov.toArray().length > 0);
  assert.ok(gov.toArray()[0].get('id'), 'Gobierno tiene id');

  let idGov = route._hashCode('Bachelet-2014-2018');
  assert.ok(studies.toArray()[0].get('government'));
  assert.equal(idGov, studies.toArray()[0].get('government').get('id'));

  assert.ok(studies.toArray()[0].get('id'), 'Estudio tiene id');

});


test("it has phases with fullfilment", function(assert){
  let route = this.subject();
  var store = this.store;
  route._uploadPhases(store);
  let phases = store.peekAll('phase');
  assert.ok(phases.toArray().length > 0);
});

test("model return government", function(assert){
  let gov = this.subject().model();
  assert.ok(gov.toArray().length > 0);
});

test("_arrayparseCsv", function(assert){
  assert.expect(2);
  var store = this.store;
  var config_studies = [
      "Bachelet-2014-2018_Marzo-2015",
      "Bachelet-2014-2018_Marzo-2016",
    ];
  this.subject()._parseStudiesGovernment(store, config_studies);
  return this.subject()._arrayparseCsv(["/studies/test/Bachelet-2014-2018_Marzo-2015.csv",
                                "/studies/test/Bachelet-2014-2018_Marzo-2016.csv"], store).then(function(studies){
    assert.ok(studies.toArray()[0].get('promises').toArray().length > 0);
    assert.ok(studies.toArray()[1].get('promises').toArray().length > 0);
  });
});

test("parses a single area", function(assert){
  assert.expect(1);
  var store = this.store;



    var config_studies = [
        "Bachelet-2014-2018_Marzo-2015",
        "Bachelet-2014-2018_Marzo-2016",
      ];
    this.subject()._parseStudiesGovernment(store, config_studies);


    let assertions = function(){
      let runner = function(){
        let areas = store.peekAll('area').toArray().filterBy('name', "Agricultura");
        assert.equal(areas.length, 1);
      };
      let bound_runner = Ember.run.bind(this, runner);
    this.subject()._arrayparseCsv(["/studies/test/Bachelet-2014-2018_Marzo-2015.csv",
                                 "/studies/test/Bachelet-2014-2018_Marzo-2016.csv"], store).then(bound_runner);
  };


  Ember.run.bind(this, assertions)();
});
