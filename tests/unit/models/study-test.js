import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('study', 'Unit | Model | pertito', {
  // Specify the other units that are required for this test.
  needs: ['model:government', 'model:promise']
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
