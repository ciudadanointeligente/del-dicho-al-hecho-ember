import { moduleForModel, test } from 'ember-qunit';
import Ember  from 'ember';

moduleForModel('government', 'Unit | Model | government', {
  // Specify the other units that are required for this test.
  needs: ['model:study', "model:promise", "model:government", "model:phase", "model:bill", "model:area", "model:priority", 'model:justification']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attributes like name and slug', function(assert){
    let government = this.subject({'name': 'Bachelet 2014-2018', 'color1': 'red'});
    assert.equal(government.get('name'), 'Bachelet 2014-2018');
    assert.ok(Ember.guidFor(government));
    assert.equal(government.toJSON().name, 'Bachelet 2014-2018');
    assert.ok(government.toJSON().slug, 'slug');
    assert.ok(government.toJSON().color1, 'red');
});

test("gov has many studies", function(assert){
  let government = this.store().modelFor('government');
  let relationship = Ember.get(government, 'relationshipsByName').get('studies');
  assert.equal(relationship.key, 'studies');
  assert.equal(relationship.kind, 'hasMany');
});
test('government comparable studies', function(assert){
    Ember.run.begin();
    let government = this.subject({'name': 'Bachelet 2014-2018', 'color': 'red'});
    let study1 = this.store().createRecord('study', {'version': 'marzo', 'year': '2016', 'government':government, 'type': 'Programa'});
    this.store().createRecord('study', {'version': 'mayo', 'year': '2016', 'government':government, 'type': 'Discurso'});
    Ember.run.end();
    let comparable = government.get('comparable');
    assert.equal(comparable.length, 1);
    assert.equal(comparable.toArray()[0].get('id'), study1.get('id'));
});
test('government area and study by year comparable studies', function(assert){
    Ember.run.begin();
    let government = this.subject({'name': 'Bachelet 2014-2018', 'color': 'red'});
    let area1 = this.store().createRecord('area', {'id': "2222222222", 'name': 'nombre2'});
    let study1 = this.store().createRecord('study', {'id': 's1','version': 'marzo', 'year': '2015', 'government':government, 'type': 'Programa'});
    let study2 = this.store().createRecord('study', {'id': 's2','version': 'marzo', 'year': '2016', 'government':government, 'type': 'Programa'});

    let promesa_1 = this.store().createRecord('promise',{'content':'content02',
                                                                   'number':'2',
                                                                   'title':'title02',
                                                                   'study': study1,
                                                                   'coherenceLevel': 1,
                                                                   'area': area1});
    let bill_a = this.store().createRecord('bill',{'name':'name_a',
                                     'id':'ba',
                                     'title':'title01',
                                     'fullfilment':'10%'
                                     
                                    });
    this.store().createRecord('justification', {'promise': promesa_1, 'bill': bill_a});

    let promesa_2 = this.store().createRecord('promise',{'content':'content02',
                                                                   'number':'2',
                                                                   'title':'title02',
                                                                   'study': study2,
                                                                   'coherenceLevel': 1,
                                                                   'area': area1});
    let bill_b = this.store().createRecord('bill',{'name':'name_b',
                                     'id':'bb',
                                     'title':'title02',
                                     'fullfilment':'20%'
                                     
                                    });
    this.store().createRecord('justification', {'promise': promesa_2, 'bill': bill_b});
    Ember.run.end();
    let fulfillment_areas = government.getFulfillmentPerArea(area1);
    assert.equal(fulfillment_areas.length, 2);
    assert.equal(fulfillment_areas[0].study.get('id'), study1.get('id'));
    assert.equal(fulfillment_areas[0].fulfillment, 10);
    assert.equal(fulfillment_areas[1].study.get('id'), study2.get('id'));
    assert.equal(fulfillment_areas[1].fulfillment, 20);
});
test('government area and study by year comparable studies diff', function(assert){
    Ember.run.begin();
    let government = this.subject({'name': 'Bachelet 2014-2018', 'color': 'red'});
    let area1 = this.store().createRecord('area', {'id': "2222222222", 'name': 'nombre2'});
    let study1 = this.store().createRecord('study', {'version': 'marzo', 'year': '2015', 'government':government, 'type': 'Programa'});
    let study2 = this.store().createRecord('study', {'version': 'marzo', 'year': '2016', 'government':government, 'type': 'Programa'});
    let study3 = this.store().createRecord('study', {'version': 'marzo', 'year': '2017', 'government':government, 'type': 'Programa'});

    let promesa_1 = this.store().createRecord('promise',{'content':'content02',
                                                                   'number':'2',
                                                                   'title':'title02',
                                                                   'study': study1,
                                                                   'coherenceLevel': 1,
                                                                   'area': area1});
    let bill_a = this.store().createRecord('bill',{'name':'name_a',
                                     'id':'ba',
                                     'title':'title01',
                                     'fullfilment':'10%'
                                     
                                    });
    this.store().createRecord('justification', {'promise': promesa_1, 'bill': bill_a});

    let promesa_2 = this.store().createRecord('promise',{'content':'content02',
                                                                   'number':'2',
                                                                   'title':'title02',
                                                                   'study': study2,
                                                                   'coherenceLevel': 1,
                                                                   'area': area1});
    let bill_b = this.store().createRecord('bill',{'name':'name_b',
                                     'id':'bb',
                                     'title':'title02',
                                     'fullfilment':'25%'
                                     
                                    });
    this.store().createRecord('justification', {'promise': promesa_2, 'bill': bill_b});
    let promesa_3 = this.store().createRecord('promise',{'content':'content03',
                                                                   'number':'3',
                                                                   'title':'title03',
                                                                   'study': study3,
                                                                   'coherenceLevel': 1,
                                                                   'area': area1});
    let bill_c = this.store().createRecord('bill',{'name':'name_c',
                                     'id':'cc',
                                     'title':'title02',
                                     'fullfilment':'25%'
                                     
                                    });
    this.store().createRecord('justification', {'promise': promesa_3, 'bill': bill_c});
    Ember.run.end();
    let fulfillment_areas = government.getFulfillmentPerAreaDiff(area1);
    assert.equal(fulfillment_areas.length, 3);
    assert.equal(fulfillment_areas[0].study.get('id'), study1.get('id'));
    assert.equal(fulfillment_areas[0].fulfillment, 10);
    assert.equal(fulfillment_areas[1].study.get('id'), study2.get('id'));
    assert.equal(fulfillment_areas[1].fulfillment, 15); //this is the difference between 25 and 10
    assert.equal(fulfillment_areas[2].study.get('id'), study3.get('id'));
    assert.equal(fulfillment_areas[2].fulfillment, 0); //this is the difference between 25 and 10
});
test('government has visible studies', function(assert){
    Ember.run.begin();
    let government = this.subject({'name': 'Bachelet 2014-2018', 'color': 'red'});
    this.store().createRecord('study', {'version': 'marzo', 'year': '2016', 'government':government, 'type': 'Programa'});
    this.store().createRecord('study', {'version': 'mayo', 'year': '2017', 'government':government, 'type': 'Discurso'});
    let government2 = this.store().createRecord('government',{'name': 'FieraFeroz 2018-2022', 'color': 'red'});
    this.store().createRecord('study', {'version': 'marzo', 'visible':true, 'year': '2018', 'government':government2, 'type': 'Programa'});
    Ember.run.end();
  assert.notOk(government.get('hasVisibleStudies'));
  assert.ok(government2.get('hasVisibleStudies'));
});
