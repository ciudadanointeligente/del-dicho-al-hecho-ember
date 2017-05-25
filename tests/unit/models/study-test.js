import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
import _ from 'lodash';

moduleForModel('study', 'Unit | Model | study (perrito)', {
  // Specify the other units that are required for this test.
  needs: ['model:government', 'model:promise', 'model:area', 'model:bill', 'model:phase', 'model:priority', 'model:justification'],
  loadData: function(store){
  Ember.run.begin();

  let gov = store.createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio = store.createRecord('study',{"version":"marzo","year":"2016", "government": gov});


  let area_1 = store.createRecord('area',{'id': 'a1', 'name':'area 01'});
  let area_2 = store.createRecord('area',{'id': 'a2', 'name':'area 02'});

  let pl1 = store.createRecord('bill',{'id':'pl1', 'name':'name01','title':'title01', 'fullfilment':'100%' });
  store.createRecord('priority', {'name':'simple', 'count': 10, 'bill': pl1});
  store.createRecord('priority', {'name':'suma', 'count': 11, 'bill': pl1});
  store.createRecord('priority', {'name':'inmediata', 'count': 12, 'bill': pl1});
  let pl2 = store.createRecord('bill',{'id':'pl2', 'name':'name02', 'title':'title02', 'fullfilment':'40%'});
  store.createRecord('priority', {'name':'simple', 'count': 10, 'bill': pl2});
  store.createRecord('priority', {'name':'suma', 'count': 11, 'bill': pl2});
  store.createRecord('priority', {'name':'inmediata', 'count': 12, 'bill': pl2});
  let pl3 = store.createRecord('bill',{'id':'pl3', 'name':'name03', 'title':'title03', 'fullfilment':'100%'});
  store.createRecord('priority', {'name':'simple', 'count': 11, 'bill': pl3});
  store.createRecord('priority', {'name':'suma', 'count': 11, 'bill': pl3});
  store.createRecord('priority', {'name':'inmediata', 'count': 12, 'bill': pl3});
  let pl4 = store.createRecord('bill',{'id':'pl4', 'name':'name04', 'title':'title04', 'fullfilment':'0%'});
  store.createRecord('promise',{'content':'content01',
                                'id':1,
                                'number':'1',
                                'title':'title01',
                                'study': estudio,
                                'bills': [pl1, pl3],
                                'area':area_1,
                                'coherenceLevel': 3
                              });//Promesa completada
  store.createRecord('promise',{'content':'content02',
                                'id':2,
                               'number':'2',
                               'title':'title02',
                               'study': estudio,
                               'bills': [pl2,pl4],
                               'coherenceLevel': 4,
                               'area':area_1});//Promesa no completada
  store.createRecord('promise',{'content':'content03',
                                'id':3,
                               'number':'3',
                               'title':'title03',
                               'study': estudio,
                               'bills': [pl3],'coherenceLevel': 4,
                               'area':area_2});//promesa completada
  let estudio2 = store.createRecord('study',{"version":"marzo","year":"2017", "government": gov});

  let pl5 = store.createRecord('bill',{'id':'pl5', 'name':'name05','title':'title05', 'fullfilment':'0%'});
  let pl6 = store.createRecord('bill',{'id':'pl6', 'name':'name06','title':'title06', 'fullfilment':'0%'});

  store.createRecord('promise',{'content':'content04',
                                'id':4,
                                'number':'4',
                                'title':'title04',
                                'study': estudio2,
                                'area':area_2,'coherenceLevel': 1,
                                'bills':[pl5,pl6]
                              });
  store.createRecord('promise',{'content':'content05',
                                'id':5,
                               'number':'5',
                               'title':'title05',
                               'study': estudio2,
                               'bills': [pl5],'coherenceLevel': 1,
                               'area':area_2
                             });
  store.createRecord('promise',{'content':'content06',
                                'id':6,
                               'number':'6',
                               'title':'title06',
                               'study': estudio2,
                               'area':area_1});
  Ember.run.end();
  return {'estudio': estudio, 'estudio2': estudio2, 'areas': [area_1, area_2]};
  }
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attributes', function(assert){
    let estudio = this.subject({'version': 'marzo',
                                'year': '2016',
                                'filename': 'mishelle-bashelet_marzo-2017.csv',
                                'type': 'Programa',
                                'image': 'perrito.svg'
                              });
    let estudio_json = estudio.toJSON();
    assert.equal(estudio_json.version, 'marzo');
    assert.equal(estudio_json.year, 2016);
    assert.equal(estudio_json.filename, 'mishelle-bashelet_marzo-2017.csv');
    assert.equal(estudio_json.in_landing, false);
    assert.equal(estudio_json.image, 'perrito.svg');
    assert.equal(estudio_json.type, 'Programa');
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
  let promesa_1=this.store().createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01', 'coherenceLevel': 3});
  let promesa_2=this.store().createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02', 'coherenceLevel': 2});
  let promesa_3=this.store().createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03', 'coherenceLevel': 4});
  let pl1 = this.store().createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%'});
  let pl2 = this.store().createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'40%'});
  let pl3 = this.store().createRecord('bill',{'name':'name03', 'title':'title03', 'fullfilment':'100%'});

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
test('order', function(assert){
  Ember.run.begin();
  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018', 'start_year': 2014, 'end_year': 2018});
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});
  gov.get('studies').pushObject(estudio);
  Ember.run.end();
  assert.equal(estudio.get('order'), 'segundo');
});

test("chartData", function(assert){
  Ember.run.begin();

  let gov = this.store().createRecord('government', {'name': 'Bachelet-2014-2018',
                                                     'color1':'#FF6384',
                                                     'color2':'#FF6385',
                                                     'color3':'#FF6386',
                                                     'color4':'#FF6387'
  });
  let estudio = this.store().createRecord('study',{"version":"marzo","year":"2016"});
  let promesa_1=this.store().createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01', 'coherenceLevel': 3});
  let promesa_2=this.store().createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02', 'coherenceLevel': 2});
  let promesa_3=this.store().createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03', 'coherenceLevel': 4});
  let pl1 = this.store().createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%'});
  let pl2 = this.store().createRecord('bill',{'name':'name02', 'title':'title02', 'fullfilment':'40%'});
  let pl3 = this.store().createRecord('bill',{'name':'name03', 'title':'title03', 'fullfilment':'100%'});

  gov.get('studies').pushObject(estudio);
  promesa_1.get('bills').pushObject(pl1);
  promesa_2.get('bills').pushObject(pl2);
  promesa_3.get('bills').pushObject(pl3);

  estudio.get('promises').pushObject(promesa_1);
  estudio.get('promises').pushObject(promesa_2);
  estudio.get('promises').pushObject(promesa_3);
  Ember.run.end();
  /*
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
  };*/
  assert.ok(estudio.get('chartData').labels);
  assert.ok(estudio.get('chartData').datasets);
  assert.ok(estudio.get('chartData').datasets[0]);
  assert.ok(estudio.get('chartData').datasets[0].data);

});

test('get bills', function(assert){
  let estudio = this.loadData(this.store()).estudio;
  assert.ok(estudio.get('bills'), 'bills');
  assert.equal(estudio.get('bills').length, 4, 'length 4');
  assert.ok(estudio.get('bills').findBy('id', 'pl1'), 'pl1');
  assert.ok(estudio.get('bills').findBy('id', 'pl2'), 'pl2');
  assert.ok(estudio.get('bills').findBy('id', 'pl3'), 'pl3');
  assert.ok(estudio.get('bills').findBy('id', 'pl4'), 'pl4');
  assert.notOk(estudio.get('bills').findBy('id', 'pl5'), 'pl5');
});

test('getCapacity', function(assert){

  let estudio = this.loadData(this.store()).estudio;
  //there are two promises that are completed
  assert.equal(estudio.get('capacity'), 2);
});

test('calc urgencies', function(assert){
  let estudio = this.loadData(this.store()).estudio;

  assert.equal(estudio.get('billsCount'), 4);
  assert.equal(estudio.get('urgenciesCount'), 100);

});

test('show promises for a single study', function(assert){
  Ember.run.begin();
  let store = this.store();
  let gov = store.createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio_1 = store.createRecord('study',{"version":"marzo","year":"2016"});
  let estudio_2 = store.createRecord('study',{"version":"mayo","year":"2016"});

  let promesa_1_1= store.createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01', 'coherenceLevel': 3});
  let promesa_1_2= store.createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});
  let promesa_1_3= store.createRecord('promise',{'content':'content03', 'number':'3', 'title':'title03'});
  let promesa_1_4= store.createRecord('promise',{'content':'content04', 'number':'4', 'title':'title04'});

  let promesa_2_1= store.createRecord('promise',{'content':'content01', 'number':'1', 'title':'title01', 'coherenceLevel': 3});
  let promesa_2_2= store.createRecord('promise',{'content':'content02', 'number':'2', 'title':'title02'});

  let pl1 = store.createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%'});
  let pl2 = store.createRecord('bill',{'name':'name01', 'title':'title01', 'fullfilment':'100%'});

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

test('getPromisesByArea', function(assert){
  Ember.run.begin();
  let store = this.store();
  let gov = store.createRecord('government', {'name': 'Bachelet-2014-2018'});
  let estudio_1 = store.createRecord('study',{"version":"marzo","year":"2016", 'gov': gov});
  let estudio_2 = store.createRecord('study',{"version":"mayo","year":"2016"});

  let promesa_1_1= store.createRecord('promise',{'id':'p1','content':'content01', 'number':'1', 'title':'title01', 'study': estudio_1});

  let promesa_1_2 = store.createRecord('promise',{'id':'p2','content':'content01', 'number':'1', 'title':'title01', 'study': estudio_2});


  let area_1 = store.createRecord('area',{'id': 1, 'name':'area 01'});

  area_1.get('promises').pushObject(promesa_1_1);
  area_1.get('promises').pushObject(promesa_1_2);
  Ember.run.end();
  let promises_estudio1 = estudio_1.getPromisesByArea(area_1);
  assert.equal(promises_estudio1.length, 1);
  assert.equal(promises_estudio1[0].get('id'),  'p1');
  let promises_estudio2 = estudio_2.getPromisesByArea(area_1);
  assert.equal(promises_estudio2.length, 1);
  assert.equal(promises_estudio2[0].get('id'), 'p2');
});
test('getPromisesGroupedByArea', function(assert){
  let estudio = this.loadData(this.store()).estudio;
  let result = estudio.get('promisesGroupedByArea');

  assert.equal(result[0].area.get('id'), 'a1');
  assert.equal(result[0].promises.length, 2);

  let p1 = _.find(result[0].promises, function(promise){return promise.get('id') === '1';});
  let p2 = _.find(result[0].promises, function(promise){return promise.get('id') === '2';});

  assert.ok(p1);
  assert.ok(p2);

  let p3 = _.find(result[1].promises, function(promise){return promise.get('id') === '3';});

  assert.equal(result[1].area.get('id'), 'a2');
  assert.equal(result[1].promises.length, 1);
  assert.ok(p3);

});
test('getFullfilmentByArea', function(assert){
  let estudio = this.loadData(this.store()).estudio;
  let estudio2 = this.loadData(this.store()).estudio2;
  let result = estudio.get('promisesGroupedByArea');
  let result2 = estudio2.get('promisesGroupedByArea');

  assert.equal(result[0].summary.completed, 1, 'a1 completed');
  assert.equal(result[0].summary.in_progress, 1,'a1 in_progress');
  assert.equal(result2[1].summary.completed, 0,'a2 completed');
  assert.equal(result2[1].summary.in_progress, 0,'a2 in_progress');
  assert.equal(result2[1].summary.no_progress, 2,'a2 no_progress');


  assert.equal(result[0].summary.fullfilment, 60, 'a1 fullfilment');
  assert.equal(result[1].summary.fullfilment, 100, 'a1 fullfilment');
  assert.equal(result2[0].summary.fullfilment, 0, 'a1 fullfilment');
  assert.equal(result2[1].summary.fullfilment, 0, 'a1 fullfilment');

  assert.equal(result[0].summary.coherenceLevel, 3.5, 's1 a1 coherenceLevel');
  assert.equal(result[1].summary.coherenceLevel, 4, 's1 a2 coherenceLevel');
  assert.equal(result2[0].summary.coherenceLevel, 1, 's2 a1 coherenceLevel');
  assert.equal(result2[1].summary.coherenceLevel, 1, 's2 a2 coherenceLevel');

});
