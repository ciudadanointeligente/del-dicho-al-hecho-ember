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
