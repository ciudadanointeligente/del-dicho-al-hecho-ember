import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('justification', 'Unit | Model | justification', {
  // Specify the other units that are required for this test.
  needs: ['model:promise', 'model:area', 'model:study', 'model:government', 'model:bill', 'model:phase', 'model:priority'],
  loadData: function(){
    Ember.run.begin();
    let promise = this.store().createRecord('promise',{'content':'content01',
                                                         'number':'1',
                                                         'title':'title01'});
   let bill = this.store().createRecord('bill',{'name':'name01',
                                     'title':'title01',
                                     'fullfilment':'100%',
                                     'coherenceLevel': 4
                                    });
    Ember.run.end();
    return {'bill': bill, 'promise': promise};
  }
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('attributes', function(assert) {
  this.loadData();
  let model = this.subject({'justification': 'este bill pertenece a esta propuesta'});
  let json = model.toJSON();
  assert.equal(json.justification, 'este bill pertenece a esta propuesta');

  let justification = this.store().modelFor('justification');
  let relationship = Ember.get(justification, 'relationshipsByName').get('promise');
  assert.equal(relationship.key, 'promise');
  assert.equal(relationship.kind, 'belongsTo');
  relationship = Ember.get(justification, 'relationshipsByName').get('bill');
  assert.equal(relationship.key, 'bill');
  assert.equal(relationship.kind, 'belongsTo');
});
