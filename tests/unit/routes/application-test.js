import { moduleFor, test } from 'ember-qunit';
import 'ember-data';
import Ember  from 'ember';
// import _ from 'lodash';

moduleFor('route:application', 'Unit | Route | application', {
  needs: ['model:bill', 'model:promise', 'model:study', 'model:government', 'model:area'],
  beforeEach: function(){
    this.inject.service('store');
  }
});

test("it parses data", function(assert){
  let route = this.subject();

  let callback = function(data){
    assert.ok(data.data.length > 0);
    let first_ = data.data[0];

    assert.equal(first_.type, "area");
    assert.ok(first_.id);
  };

  route._parseCsv("/studies/Bachelet-2014-2018_Marzo-2016.csv").then(callback);

});

test("automatically loads data", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){
      this.subject().model().then(function(){
      let bills = store.peekAll('bill');
      assert.ok(bills.toArray().length > 0);
      let promises = store.peekAll('promise');
      assert.ok(promises.toArray().length > 0);
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});

test("bill has promise", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){
    this.subject().model().then(function(){
      let expected_promise = store.peekRecord('promise', 26);
      let bill = store.peekRecord('bill', 906907);
      assert.equal(bill.get('promise').get('id'), expected_promise.id);
      done();
    });
  };

  Ember.run.bind(this, assertions)();

});


test("promise has many bills and an area", function(assert){
  var done = assert.async();
  var store = this.store;

  let assertions = function(){
    this.subject().model().then(function(){
      let expected_promise = store.peekRecord('promise', 26);
      let bill = store.peekRecord('bill', 906907);
      let bill2 = store.peekRecord('bill', 1034406);
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
  	"ID": "1",
  	"Ano": "2016",
  	"Version": "mayo",
  	"Area": "Democracia",
  	"Promesa": 'Hola esto es una promesa',
  	"CumplimientoTotal": "40%",
  	"CoherenciaTotal": "4",
  	"Boletin": "10344-06",
  	"Titulo": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
  	"Link": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
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

  let expected_data = [
    {
      attributes:
      {
        content: 'Hola esto es una promesa'
      },
      id: 1,
      type: "promise"

    },
  {
  	"id": 1034406,
  	"type": "bill",
  	"attributes": {
  		"name": "10344-06",
  		"title": "Regula el ejercicio del sufragio de los ciudadanos que se encuentran fuera del país.",
  		"url": "http://www.senado.cl/appsenado/templates/tramitacion/index.php",
  		"justification": "Esto es un perrito",
  		"year": "2016",
  		"version": "mayo"
  	},
    "relationships": {
      "promise": {
        "data": {
          "id": 1,
          "type": 'promise'
        }
      }
    }

  }];
  assert.deepEqual(resulting_data, expected_data);
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
