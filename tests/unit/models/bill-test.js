import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('bill', 'Unit | Model | bill', {
  // Specify the other units that are required for this test.
  needs: ['model:phase', 'model:promise', 'model:priority', 'model:justification']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it has attribute', function(assert){
  let test = this.subject({'name': '7543-12',
    'title':'Reforma al Código de aguas',
    'url': 'www.congresoabierto.cl/proyectos/7543-12',
    'justification': 'El proyecto contempla que se permita a la admin. limitar el ejrcicio de los dd de los aprovechamiento',
    'fullfilment':40});
  assert.equal(test.get('name'), '7543-12');
  assert.equal(test.get('title'), 'Reforma al Código de aguas');
  assert.equal(test.get('url'), 'www.congresoabierto.cl/proyectos/7543-12');
  assert.equal(test.get('justification'), 'El proyecto contempla que se permita a la admin. limitar el ejrcicio de los dd de los aprovechamiento');
  assert.equal(test.get('fullfilment'), 40);
});

test("bill belongs to phase", function(assert){
  let bill = this.store().modelFor('bill');
  let relationship = Ember.get(bill, 'relationshipsByName').get('phase');
  assert.equal(relationship.key, 'phase');
  assert.equal(relationship.kind, 'belongsTo');
});

test("bill has many priorities", function(assert){
  let bill = this.store().modelFor('bill');
  let relationship = Ember.get(bill, 'relationshipsByName').get('priorities');
  assert.equal(relationship.key, 'priorities');
  assert.equal(relationship.kind, 'hasMany');
});


test("bill belongs to promise", function(assert){
  let bill = this.store().modelFor('bill');
  let relationship = Ember.get(bill, 'relationshipsByName').get('justifications');
  assert.equal(relationship.key, 'justifications');
  assert.equal(relationship.kind, 'hasMany');
});

// test("preloading some data", function(assert){
//     let the_bills = this.store().peekAll('bill');
//     let arr = the_bills.toArray();
//     assert.ok(arr.length > 0);
// });
