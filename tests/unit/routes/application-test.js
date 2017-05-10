import { moduleFor, test } from 'ember-qunit';
import 'ember-data';
import Ember  from 'ember';
import _ from 'lodash';

moduleFor('route:application', 'Unit | Route | application', {
  needs: ['model:bill', 'model:promise', 'model:study', 'model:government', 'model:area', 'model:phase', 'model:priority', 'model:justification'],
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
      assert.equal(promises.toArray().length, 26);
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
      assert.equal(bill.get('promises').toArray()[0].get('id'), expected_promise.id);
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
  let estudio = store.createRecord('study',{"version":"marzo","year":"2016", "id": 1234});
  Ember.run.end();

  let assertions = function(){
    Ember.run.begin();
    this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store,estudio).then(function(){
      let expected_promise = store.peekAll('promise').toArray().findBy('number', 26);
      let bill = store.peekAll('bill').toArray().findBy('name', '9069-07' );
      let bill2 = store.peekAll('bill').toArray().findBy('name', '10344-06' );
      assert.equal(bill.get('promises').toArray()[0].get('id'), expected_promise.id);
      assert.equal(bill2.get('promises').toArray()[0].get('id'), expected_promise.id);
      let promises = store.peekAll('promise');
      assert.equal(promises.toArray().length, 26);
      assert.equal(expected_promise.get('area').get('name'), "Democracia");
      let bills = store.peekAll('bill');
      assert.equal(bills.toArray().length, 7);
      let priorities = store.peekAll('priority');
      assert.equal(priorities.toArray().length, 21);
      assert.equal(estudio.get('urgenciesCount'), 42);
      done();
    });
    Ember.run.end();
  };

  Ember.run.bind(this, assertions)();

});


test("BUG with coherence returning NaN", function(assert){
  var done = assert.async();
  var store = this.store;
  Ember.run.begin();
  let estudio = store.createRecord('study',{"version":"marzo","year":"2016", "id": 1234});
  Ember.run.end();

  let assertions = function(){
    this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store,estudio).then(function(){
      let promise = store.peekAll('promise').toArray().findBy('number', 26);
      assert.ok(promise.get('study').get('coherenceLevel'));
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});

test("bills belong to more than one promise", function(assert){
  var done = assert.async();
  var store = this.store;
  Ember.run.begin();
  let estudio = store.createRecord('study',{"version":"marzo","year":"2016", "id": 1234});
  Ember.run.end();

  let assertions = function(){
    this.subject()._parseCsv("/studies/test/Bachelet-2014-2018_Marzo-2016.csv", store,estudio).then(function(){
      let bill = store.peekRecord('bill', 1736333047);
      assert.equal(bill.get('promises').toArray().length, 2);
      assert.equal(bill.get('priorities').toArray().length, 3);
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});


test('matches csv with model attributes', function(assert){
  let route = this.subject();

  let row_from_csv = {
  	"uid": "1",
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
  	"justificacion_avance": "Esto es un perrito"
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


  let parsed_just = _.find(resulting_data, {type:'justification'});
  assert.ok(parsed_just.id);
  assert.equal(parsed_just.relationships.promise.data.id, 1);
  assert.equal(parsed_just.relationships.promise.data.type, 'promise');
  assert.equal(parsed_just.relationships.bill.data.id, parsed_bill.id);
  assert.equal(parsed_just.relationships.bill.data.type, 'bill');
  assert.equal(parsed_just.attributes.justification, "Esto es un perrito");
  //assert.equal(parsed_bill.relationships.promises.data[0].id, parsed_promise.id);
  //assert.equal(parsed_bill.relationships.promises.data[0].type, 'promise');

});
test('doesnt return anything', function(assert){
  let route = this.subject();

  let row_from_csv = {
  	"uid": "",
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
  	"justificacion_avance": ""
  };

  let resulting_data = route._parseAttributes(row_from_csv);
  assert.notOk(resulting_data.length);

});



test("it has studies and government", function(assert){
  let route = this.subject();
  var store = this.store;
  Ember.run.begin();
  route._parseStudiesGovernment(store);
  Ember.run.end();
  let studies = store.peekAll('study');
  assert.ok(studies.toArray().length > 0);
  let gov = store.peekAll('government');
  assert.ok(gov.toArray().length > 0);
  assert.ok(gov.toArray()[0].get('id'), 'Gobierno tiene id');

  let idGov = route._hashCode('Michelle Bachelet');
  assert.ok(studies.toArray()[0].get('government'));

  let parsed_gov = studies.toArray()[0].get('government');
  assert.equal(idGov, parsed_gov.get('id'));
  assert.ok(studies.toArray()[0].get('image'), 'Image for study');
  assert.ok(studies.toArray()[0].get('type'), 'Image for study');
  assert.ok(studies.toArray()[0].get('id'), 'Estudio tiene id');

});
test('creates id even if where to get id from', function(assert){
  let route = this.subject();

  let row_from_csv = {
  	"uid": "1",
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
    // Justificacion debería ser justificacion_avance (no justificacion) y
    // aún así debería crear un id!
  	"justificacion": "Esto es un perrito"
  };
  let resulting_data = route._parseAttributes(row_from_csv);


  let parsed_just = _.find(resulting_data, {type:'justification'});
  assert.ok(parsed_just.id);

});
test('if there is a bill but no justification_explanation create one anyways', function(assert){

  let route = this.subject();

  let row_from_csv = {
  	"uid": "1",
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
    // Justificacion está vacía y debería crear una justificación
  	"justificacion_avance": ""
  };
  let resulting_data = route._parseAttributes(row_from_csv);


  let parsed_just = _.find(resulting_data, {type:'justification'});
  assert.ok(parsed_just.id);
});
test('if there is no bill then no justification either', function(assert){
  let route = this.subject();

  let row_from_csv = {
  	"uid": "1",
  	"Ano": "2016",
  	"Version": "mayo",
  	"area": "Democracia",
  	"promesa": 'Hola esto es una promesa',
  	"avance_total": "40%",
  	"coherencia": "4",
  	"boletin": "",
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
    // Justificacion debería ser justificacion_avance (no justificacion) y
    // aún así debería crear un id!
  	"justificacion": "Esto es un perrito"
  };
  let resulting_data = route._parseAttributes(row_from_csv);


  let parsed_just = _.find(resulting_data, {type:'justification'});
  assert.notOk(parsed_just);

});


test("it has phases with fullfilment", function(assert){
  let route = this.subject();
  var store = this.store;
  route._uploadPhases(store);
  let phases = store.peekAll('phase');
  assert.ok(phases.toArray().length > 0);
});

test("model return government", function(assert){
  Ember.run.begin();
  let gov = this.subject().model();
  Ember.run.end();
  assert.ok(gov.toArray().length > 0);
});

test("_arrayparseCsv", function(assert){
  assert.expect(2);
  var store = this.store;
  var config_governments =[{
  	"name": "Mishelle Bashelet",
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
  this.subject()._parseStudiesGovernment(store, config_governments);
  Ember.run.end();
  return this.subject()._arrayparseCsv(["test/Bachelet-2014-2018_Marzo-2015.csv",
                                "test/Bachelet-2014-2018_Marzo-2016.csv"], store).then(function(studies){
    assert.ok(studies.toArray()[0].get('promises').toArray().length > 0);
    assert.ok(studies.toArray()[1].get('promises').toArray().length > 0);
  });
});


test("parses a single area", function(assert){
  assert.expect(1);
  var store = this.store;
  var config_governments =[{
  	"name": "Mishelle Bashelet",
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
  this.subject()._parseStudiesGovernment(store, config_governments);
  Ember.run.end();
  return this.subject()._arrayparseCsv(["test/Bachelet-2014-2018_Marzo-2015.csv",
                                "test/Bachelet-2014-2018_Marzo-2016.csv"], store).then(function(){
      Ember.run.begin();
      let areas = store.peekAll('area').toArray().filterBy('name', "Agricultura");
      Ember.run.end();
      assert.equal(areas.length, 1);
  });
});
