import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('study', 'Unit | Model | pertito', {
  // Specify the other units that are required for this test.
  needs: ['model:government', 'model:promise', 'model:area', 'model:bill', 'model:phase', 'model:priority'],
  loadData: function(store){
  Ember.run.begin();

  let gov = store.createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = store.createRecord('study',{"version":"marzo","year":"2016"});
  let promesa_1= store.createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_2= store.createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let promesa_3= store.createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03'});
  let pl1 = store.createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%', 'coherenceLevel': 3});
  store.createRecord('priority', {'name':'simple', 'count': 10, 'bill': pl1});
  store.createRecord('priority', {'name':'suma', 'count': 11, 'bill': pl1});
  store.createRecord('priority', {'name':'inmediata', 'count': 12, 'bill': pl1});
  let pl2 = store.createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'40%', 'coherenceLevel': 2});
  store.createRecord('priority', {'name':'simple', 'count': 10, 'bill': pl2});
  store.createRecord('priority', {'name':'suma', 'count': 11, 'bill': pl2});
  store.createRecord('priority', {'name':'inmediata', 'count': 12, 'bill': pl2});
  let pl3 = store.createRecord('bill',{'name':'name03', 'title':'title03', 'fullfilment':'100%', 'coherenceLevel': 4});
  store.createRecord('priority', {'name':'simple', 'count': 11, 'bill': pl3});
  store.createRecord('priority', {'name':'suma', 'count': 11, 'bill': pl3});
  store.createRecord('priority', {'name':'inmediata', 'count': 12, 'bill': pl3});

  gov.get('studies').pushObject(estudio);
  promesa_1.get('bills').pushObject(pl1);
  promesa_2.get('bills').pushObject(pl2);
  promesa_3.get('bills').pushObject(pl3);

  estudio.get('promises').pushObject(promesa_1);
  estudio.get('promises').pushObject(promesa_2);
  estudio.get('promises').pushObject(promesa_3);
  Ember.run.end();
  return {'estudio': estudio};
  }
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attributes', function(assert){
    let estudio = this.subject({'version': 'marzo', 'year': '2016', });
    assert.equal(estudio.get('version'), 'marzo');
    assert.equal(estudio.get('year'), 2016);
});

test("study has many promises", function(assert){
  let study = this.store().modelFor('study');
  let relationship = Ember.get(study, 'relationshipsByName').get('promises');
  assert.equal(relationship.key, 'promises');
  assert.equal(relationship.kind, 'hasMany');
});

test("study belongs to government", function(assert){
  let study = this.store().modelFor('study');
  let relationship = Ember.get(study, 'relationshipsByName').get('government');
  assert.equal(relationship.key, 'government');
  assert.equal(relationship.kind, 'belongsTo');
});


test("study has slug attribute", function(assert){
  Ember.run.begin();
  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = this.subject({'version': 'marzo', 'year': '2016'});
  gov.get('studies').pushObject(estudio);
  assert.equal(estudio.get('slug'), 'bachelet-2014-2018_marzo-2016');
  Ember.run.end();
});

test("study has an attr presentanAvance", function(assert){
  let estudio = this.subject({'presentanAvance': 10 });
  assert.equal(estudio.get('presentanAvance'), 10);
});

test("study return nro of finalizadas", function(assert){
  Ember.run.begin();

  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});

  gov.get('studies').pushObject(estudio);
  let promesa_1=this.store().createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_2=this.store().createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let pl1 = this.store().createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%'});
  let pl2 = this.store().createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'0%'});
  promesa_1.get('bills').pushObject(pl1);
  promesa_2.get('bills').pushObject(pl2);

  estudio.get('promises').pushObject(promesa_1);
  estudio.get('promises').pushObject(promesa_2);


  assert.equal(estudio.get('finalizadas'), 1);
  Ember.run.end();
});

test("study return nro of en desarrollo", function(assert){
  Ember.run.begin();

  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});

  gov.get('studies').pushObject(estudio);
  let promesa_1=this.store().createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_2=this.store().createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let promesa_3=this.store().createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03'});
  let pl1 = this.store().createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%'});
  let pl2 = this.store().createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'40%'});
  let pl3 = this.store().createRecord('bill',{'name':'name03', 'title':'title03', 'fullfilment':'70%'});
  promesa_1.get('bills').pushObject(pl1);
  promesa_2.get('bills').pushObject(pl2);
  promesa_3.get('bills').pushObject(pl3);

  estudio.get('promises').pushObject(promesa_1);
  estudio.get('promises').pushObject(promesa_2);
  estudio.get('promises').pushObject(promesa_3);


  assert.equal(estudio.get('enDesarrollo'), 2);
  Ember.run.end();
});

test('study return the capacity', function(assert){
  Ember.run.begin();

  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});
  let promesa_1=this.store().createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_2=this.store().createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let promesa_3=this.store().createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03'});
  let pl1 = this.store().createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%', 'coherenceLevel': 3});
  let pl2 = this.store().createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'40%', 'coherenceLevel': 2});
  let pl3 = this.store().createRecord('bill',{'name':'name03', 'title':'title03', 'fullfilment':'100%', 'coherenceLevel': 4});

  gov.get('studies').pushObject(estudio);
  promesa_1.get('bills').pushObject(pl1);
  promesa_2.get('bills').pushObject(pl2);
  promesa_3.get('bills').pushObject(pl3);

  estudio.get('promises').pushObject(promesa_1);
  estudio.get('promises').pushObject(promesa_2);
  estudio.get('promises').pushObject(promesa_3);

  assert.equal(estudio.get('capacidad'), 1);

  Ember.run.end();
});


test('fullName', function(assert){
  Ember.run.begin();
  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});
  gov.get('studies').pushObject(estudio);
  Ember.run.end();
  assert.equal(estudio.get('fullName'), 'marzo 2016');
});

test("chartData", function(assert){
  Ember.run.begin();

  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});
  let promesa_1=this.store().createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_2=this.store().createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let promesa_3=this.store().createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03'});
  let pl1 = this.store().createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%', 'coherenceLevel': 3});
  let pl2 = this.store().createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'40%', 'coherenceLevel': 2});
  let pl3 = this.store().createRecord('bill',{'name':'name03', 'title':'title03', 'fullfilment':'100%', 'coherenceLevel': 4});

  gov.get('studies').pushObject(estudio);
  promesa_1.get('bills').pushObject(pl1);
  promesa_2.get('bills').pushObject(pl2);
  promesa_3.get('bills').pushObject(pl3);

  estudio.get('promises').pushObject(promesa_1);
  estudio.get('promises').pushObject(promesa_2);
  estudio.get('promises').pushObject(promesa_3);
  Ember.run.end();

  let expected_dataChart = {
      labels: [
        "% avance", "% incompleto"
      ],
      datasets: [
          {
              data: [80, 20],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
              ]
          }]
  };
  assert.deepEqual(estudio.get('chartData'), expected_dataChart);
});

test('calc urgencies', function(assert){
  let estudio = this.loadData(this.store()).estudio;
  assert.equal(estudio.get('urgenciesCount'), 100);

});

test('show promises for a single study', function(assert){
  Ember.run.begin();
  let store = this.store();
  let gov = store.createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio_1 = store.createRecord('study',{"version":"marzo","year":"2016"});
  let estudio_2 = store.createRecord('study',{"version":"mayo","year":"2016"});

  let promesa_1_1= store.createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_1_2= store.createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let promesa_1_3= store.createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03'});
  let promesa_1_4= store.createRecord('promise',{'content':'content04', 'number':'4', 'title':'title04'});

  let promesa_2_1= store.createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01'});
  let promesa_2_2= store.createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});

  let pl1 = store.createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%', 'coherenceLevel': 3});
  let pl2 = store.createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%', 'coherenceLevel': 3});

  let area_1 = store.createRecord('area',{'id': 1, 'name':'area 01'});
  let area_2 = store.createRecord('area',{'id': 2, 'name':'area 02'});
  let area_3 = store.createRecord('area',{'id': 3, 'name':'area 03'});

  area_1.get('promises').pushObject(promesa_1_1);
  area_2.get('promises').pushObject(promesa_1_2);
  area_3.get('promises').pushObject(promesa_1_3);
  area_3.get('promises').pushObject(promesa_1_4);

  area_1.get('promises').pushObject(promesa_2_1);
  area_2.get('promises').pushObject(promesa_2_2);

  promesa_1_1.get('bills').pushObject(pl1);
  promesa_2_1.get('bills').pushObject(pl2);

  gov.get('studies').pushObject(estudio_1);
  gov.get('studies').pushObject(estudio_2);

  estudio_1.get('promises').pushObject(promesa_1_1);
  estudio_1.get('promises').pushObject(promesa_1_2);
  estudio_1.get('promises').pushObject(promesa_1_3);
  estudio_1.get('promises').pushObject(promesa_1_4);

  estudio_2.get('promises').pushObject(promesa_2_1);
  estudio_2.get('promises').pushObject(promesa_2_2);
  Ember.run.end();

  let areas_1_array = estudio_1.get('areas');

  assert.ok(areas_1_array.filterBy('id', 1),'kaka');
  assert.ok(areas_1_array.filterBy('id', 2),'keke');
  assert.ok(areas_1_array.filterBy('id', 3),'kiki');

  assert.equal(areas_1_array.length, 3);

  let areas_2_array = estudio_2.get('areas');
  assert.ok(areas_2_array.filterBy('id', 1),'lala');
  assert.ok(areas_2_array.filterBy('id', 2),'lele');
  assert.notOk(areas_2_array.filterBy('id', 3).length,0);

  assert.equal(areas_2_array.length, 2);
});