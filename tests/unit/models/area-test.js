import { moduleForModel, test} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('area', 'Unit | Model | area', {
  // Specify the other units that are required for this test.
  needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority', 'model:justification'],
  loadData: function(){
    Ember.run.begin();
    // Having two areas
    let area1 = this.subject({'id': "1111111111", 'name': 'nombre1'});
    let area2 = this.store().createRecord('area', {'id': "2222222222", 'name': 'nombre2'});

    // First Government
    let gov1 = this.store().createRecord('government', {'name': 'Bachelet-2014-2018'});
    let study1 = this.store().createRecord('study', {'version': 'marzo', 'year': '2016'});
    gov1.get('studies').pushObject(study1);
    let promesa_1 = this.store().createRecord('promise',{'content':'content01',
                                                         'number':'1',
                                                         'title':'title01',
                                                         'study': study1,'coherenceLevel': 4,
                                                         'area': area1});
    let promesa_2 = this.store().createRecord('promise',{'content':'content02',
                                                                   'number':'2',
                                                                   'title':'title02',
                                                                   'study': study1,'coherenceLevel': 1,
                                                                   'area': area1});
   let bill_a = this.store().createRecord('bill',{'name':'name_a',
                                     'id':'ba',
                                     'title':'title01',
                                     'fullfilment':'100%'
                                     
                                    });
   let justification1 = this.store().createRecord('justification', {'promise': promesa_1, 'bill': bill_a});
   let bill_b = this.store().createRecord('bill',{'name':'name_b',
                                     'id':'bb',
                                     'title':'title02',
                                     'fullfilment':'0%'});
   this.store().createRecord('justification', {'promise': promesa_2, 'bill': bill_b});

   let promesa_11 = this.store().createRecord('promise',{'content':'content01',
                                                         'number':'1',
                                                         'title':'title01',
                                                         'study': study1,
                                                         'coherenceLevel': 1,
                                                         'area': area2});
   let promesa_21 = this.store().createRecord('promise',{'content':'content02',
                                                         'number':'2',
                                                         'title':'title02',
                                                         'coherenceLevel': 3,
                                                         'study': study1,
                                                         'area': area2});

   let bill1 = this.store().createRecord('bill',{'name':'name01',
                                     'id':'b1',
                                     'title':'title01',
                                     'fullfilment':'25%',
                                     });
   this.store().createRecord('justification', {'promise': promesa_11, 'bill': bill1});
   let bill2 = this.store().createRecord('bill',{'name':'name02',
                                     'id':'b2',
                                     'title':'title02',
                                     'fullfilment':'25%'});
   this.store().createRecord('justification', {'promise': promesa_21, 'bill': bill2});

    let gov2 = this.store().createRecord('government', {'name': 'Piñera-2011-2014'});

    let study2 = this.store().createRecord('study', {'version': 'marzo',
                                                     'year': '2013',
                                                     'government': gov2
                                                   });

    let promesa_3 = this.store().createRecord('promise',{'content':'content01',
                                                         'number':'1',
                                                         'title':'title01',
                                                         'study': study2,
                                      'coherenceLevel': 4,
                                                         'area': area1});
    let promesa_4 = this.store().createRecord('promise',{'content':'content02',
                                                         'number':'2',
                                                         'title':'title02',
                                      'coherenceLevel': 3,
                                                         'study': study2,
                                                         'area': area1});

    let bill3 = this.store().createRecord('bill',{'name':'name03',
                                     'id':'b3',
                                      'title':'title01',
                                      'fullfilment':'100%'});
   this.store().createRecord('justification', {'promise': promesa_3, 'bill': bill3});
    let bill4 = this.store().createRecord('bill',{'name':'name04',
                                     'id':'b4',
                                      'title':'title02',
                                      'fullfilment':'100%'});
   this.store().createRecord('justification', {'promise': promesa_3, 'bill': bill4});
    let bill5 = this.store().createRecord('bill',{'name':'name05',
                                     'id':'b5',
                                      'title':'title04',
                                      'fullfilment':'100%'});
   this.store().createRecord('justification', {'promise': promesa_4, 'bill': bill5});
    let bill6 = this.store().createRecord('bill',{'name':'name06',
                                     'id':'b6',
                                      'title':'title05',
                                      'fullfilment':'10%'});
   this.store().createRecord('justification', {'promise': promesa_4, 'bill': bill6});

    Ember.run.end();
    return {"area1": area1,
            "area2": area2,
            "study1": study1,
            "bill1": bill_a,
            "justification1": justification1,
            "study2": study2};
  }
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
    assert.ok(!!model);
});

test('tiene nombre entre sus atributos', function(assert){
    let ar = this.subject({'name': 'nombre'});
    assert.equal(ar.toJSON().name, 'nombre');
    assert.ok(ar.toJSON().slug);
});

test("area has many promises", function(assert){
  let area = this.store().modelFor('area');
  let relationship = Ember.get(area, 'relationshipsByName').get('promises');
  assert.equal(relationship.key, 'promises');
  assert.equal(relationship.kind, 'hasMany');
});

test('area getFulfillment by study', function(assert){

  let data = this.loadData();

  assert.equal(data.area1.fullfilmentPerStudy(data.study1), 50);
  assert.equal(data.area2.fullfilmentPerStudy(data.study1), 25);
  assert.equal(data.area1.fullfilmentPerStudy(data.study2), 78);
  assert.equal(data.area2.fullfilmentPerStudy(data.study2), 0);
});

test('getCapacity', function(assert){
  let data = this.loadData();
  assert.equal(data.area1.capacityByStudy(data.study1), 1);
});

test('area getCoherenceLevelByStudy', function(assert){

  let data = this.loadData();

  assert.equal(data.area1.coherenceLevelByStudy(data.study1), 2.5, 'a');
  assert.equal(data.area2.coherenceLevelByStudy(data.study1), 2, 'b');
  assert.equal(data.area1.coherenceLevelByStudy(data.study2), 3.5, 'c');
  assert.equal(data.area2.coherenceLevelByStudy(data.study2), 1, 'd');
});
test('area getPoliticalWillByStudy', function(assert){
  let data = this.loadData();
  Ember.run.begin();
  data.bill1.unloadRecord();
  data.justification1.unloadRecord();
  Ember.run.end();
  assert.equal(data.area1.getPoliticalWillByStudy(data.study1), 1);
  assert.equal(data.area2.getPoliticalWillByStudy(data.study1), 2);

});
test('area getCompletedPromisesByStudy', function(assert){

  let data = this.loadData();

  assert.equal(data.area1.getCompletedPromisesByStudy(data.study1), 1);
  assert.equal(data.area2.getCompletedPromisesByStudy(data.study1), 0);
  assert.equal(data.area1.getCompletedPromisesByStudy(data.study2), 1);
  assert.equal(data.area2.getCompletedPromisesByStudy(data.study2), 0);
});
test("it calculates things of bills", function(assert){
  Ember.run.begin();
  let promesa_1 = this.store().createRecord('promise',{'content':'content01',
                                                       'number':'1',
                                   'coherenceLevel': 4,
                                                       'title':'title01'});
  let promesa_2 = this.store().createRecord('promise',{'content':'content02',
                                                                 'number':'2',
                                   'coherenceLevel': 1,
                                                                 'title':'title02'});
 let b1 = this.store().createRecord('bill',{'name':'name01',
                                   'title':'title01',
                                   'fullfilment':'100%',
                                  });
  this.store().createRecord('justification', {'promise': promesa_1,'bill': b1});
 let b2 = this.store().createRecord('bill',{'name':'name02',
                                   'title':'title02',
                                   'fullfilment':'0%',
                                   });
  this.store().createRecord('justification', {'promise': promesa_2,'bill': b2});
  Ember.run.end();
  let result_coherence = this.subject().getAverageFrom([promesa_1, promesa_2], 'coherenceLevel');
  assert.equal(result_coherence, 2.5);
  let result_fullfilment = this.subject().getAverageFrom([promesa_1, promesa_2], 'fullfilment');
  assert.equal(result_fullfilment, 50);
});
