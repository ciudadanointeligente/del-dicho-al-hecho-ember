import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('study', 'Unit | Model | pertito', {
  // Specify the other units that are required for this test.
  needs: ['model:government', 'model:promise', 'model:area', 'model:bill', 'model:phase', 'model:priority']
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
