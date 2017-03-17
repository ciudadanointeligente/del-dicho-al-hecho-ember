import { moduleForModel, test} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('area', 'Unit | Model | area', {
  // Specify the other units that are required for this test.
  needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority'],
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
                                                         'study': study1,
                                                         'area': area1});
    let promesa_2 = this.store().createRecord('promise',{'content':'content02',
                                                                   'number':'2',
                                                                   'title':'title02',
                                                                   'study': study1,
                                                                   'area': area1});
   this.store().createRecord('bill',{'name':'name01',
                                     'title':'title01',
                                     'fullfilment':'100%',
                                     'promise': promesa_1,
                                     'coherence': 4
                                    });
   this.store().createRecord('bill',{'name':'name02',
                                     'title':'title02',
                                     'fullfilment':'0%',
                                     'promise': promesa_2,
                                     'coherence': 1});


   let promesa_11 = this.store().createRecord('promise',{'content':'content01',
                                                         'number':'1',
                                                         'title':'title01',
                                                         'study': study1,
                                                         'area': area2});
   let promesa_21 = this.store().createRecord('promise',{'content':'content02',
                                                         'number':'2',
                                                         'title':'title02',
                                                         'study': study1,
                                                         'area': area2});

   this.store().createRecord('bill',{'name':'name01',
                                     'title':'title01',
                                     'fullfilment':'25%',
                                     'coherence': 1,
                                     "promise": promesa_11});
   this.store().createRecord('bill',{'name':'name02',
                                     'title':'title02',
                                     'fullfilment':'25%',
                                     'coherence': 3,
                                     "promise": promesa_21});

    let gov2 = this.store().createRecord('government', {'name': 'Piñera-2011-2014'});



    let study2 = this.store().createRecord('study', {'version': 'marzo',
                                                     'year': '2013',
                                                     'government': gov2
                                                   });






    let promesa_3 = this.store().createRecord('promise',{'content':'content01',
                                                         'number':'1',
                                                         'title':'title01',
                                                         'study': study2,
                                                         'area': area1});
    let promesa_4 = this.store().createRecord('promise',{'content':'content02',
                                                         'number':'2',
                                                         'title':'title02',
                                                         'study': study2,
                                                         'area': area1});

    this.store().createRecord('bill',{'name':'name01',
                                      'title':'title01',
                                      'coherence': 4,
                                      'promise': promesa_3,
                                      'fullfilment':'100%'});
    this.store().createRecord('bill',{'name':'name02',
                                      'title':'title02',
                                      'coherence': 3,
                                      'promise': promesa_3,
                                      'fullfilment':'100%'});
    this.store().createRecord('bill',{'name':'name04',
                                      'title':'title04',
                                      'coherence': 3,
                                      'promise': promesa_4,
                                      'fullfilment':'100%'});
    this.store().createRecord('bill',{'name':'name05',
                                      'title':'title05',
                                      'coherence': 3,
                                      'promise': promesa_4,
                                      'fullfilment':'10%'});

    Ember.run.end();
    return {"area1": area1,
            "area2": area2,
            "study1": study1,
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
  assert.equal(data.area1.fullfilmentPerStudy(data.study2), 77.5);
  assert.equal(data.area2.fullfilmentPerStudy(data.study2), 0);
});

test('area getCoherenceLevelByStudy', function(assert){

  let data = this.loadData();

  assert.equal(data.area1.coherenceLevelByStudy(data.study1), 2.5);
  assert.equal(data.area2.coherenceLevelByStudy(data.study1), 2);
  assert.equal(data.area1.coherenceLevelByStudy(data.study2), 3.25);
  assert.equal(data.area2.coherenceLevelByStudy(data.study2), 0);
});

// test('area getCompletedPromisesByStudy', function(assert){
//
//   let data = this.loadData();
//
//   assert.equal(data.area1.getCompletedPromisesByStudy(data.study1), 1);
//   assert.equal(data.area2.getCompletedPromisesByStudy(data.study1), 0);
//   assert.equal(data.area1.getCompletedPromisesByStudy(data.study2), 3.5);
//   assert.equal(data.area2.getCompletedPromisesByStudy(data.study2), 0);
// });
test("it calculates things of bills", function(assert){
  Ember.run.begin();
  let promesa_1 = this.store().createRecord('promise',{'content':'content01',
                                                       'number':'1',
                                                       'title':'title01'});
  let promesa_2 = this.store().createRecord('promise',{'content':'content02',
                                                                 'number':'2',
                                                                 'title':'title02'});
 this.store().createRecord('bill',{'name':'name01',
                                   'title':'title01',
                                   'fullfilment':'100%',
                                   'promise': promesa_1,
                                   'coherence': 4
                                  });
 this.store().createRecord('bill',{'name':'name02',
                                   'title':'title02',
                                   'fullfilment':'0%',
                                   'promise': promesa_2,
                                   'coherence': 1});
  Ember.run.end();
  let result = this.subject().getAverageFrom([promesa_1, promesa_2], 'coherence');

  assert.equal(result, 2.5);
});
